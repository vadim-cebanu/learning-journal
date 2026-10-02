# V-Server Setup

This project documents how I set up and secured a virtual server (V-Server) running Ubuntu 24.04 as part of my DevSecOps training at Developer Akademie. The server uses SSH key authentication only, runs the NGINX web server with a custom HTML page and is connected to GitHub via SSH.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quickstart](#quickstart)
- [Usage](#usage)
  - [1. Create an SSH Key Pair](#1-create-an-ssh-key-pair)
  - [2. Copy the Public Key to the Server](#2-copy-the-public-key-to-the-server)
  - [3. Disable Password Login](#3-disable-password-login)
  - [4. Install NGINX](#4-install-nginx)
  - [5. Serve a Custom HTML Page](#5-serve-a-custom-html-page)
  - [6. Configure Git](#6-configure-git)
  - [7. Connect the Server to GitHub](#7-connect-the-server-to-github)
- [Testing](#testing)
- [Checklist](#checklist)

## Prerequisites

- A V-Server with Ubuntu 24.04 and a user with `sudo` rights
- The server's IP address, username and initial password
- A local computer with a terminal and OpenSSH (`ssh`, `ssh-keygen`, `ssh-copy-id`)
- A GitHub account

> **Note:** In this documentation `<user>` stands for the server username and `<server-ip>` for the IP address of the server. No real IP addresses, passwords or key contents are stored in this repository.

## Quickstart

```bash
# 1. Create a key pair on your local computer
ssh-keygen -t ed25519 -C "vserver"

# 2. Copy the public key to the server
ssh-copy-id -i ~/.ssh/id_ed25519.pub <user>@<server-ip>

# 3. Log in with the SSH key
ssh -i ~/.ssh/id_ed25519 <user>@<server-ip>

# 4. Install NGINX on the server
sudo apt update && sudo apt install nginx -y
```

Then open `http://<server-ip>` in the browser to see the NGINX welcome page.

## Usage

### 1. Create an SSH Key Pair

The key pair is created on the **local computer**, not on the server:

```bash
ssh-keygen -t ed25519 -C "vserver"
```

This creates two files:

- `~/.ssh/id_ed25519` – the **private key**, which never leaves my computer
- `~/.ssh/id_ed25519.pub` – the **public key**, which is copied to the server

### 2. Copy the Public Key to the Server

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub <user>@<server-ip>
```

This adds the public key to `~/.ssh/authorized_keys` of the user on the server. The server password is needed only once for this step.

To make connecting easier, I added a host entry to `~/.ssh/config` on my local computer:

```
Host vserver
    HostName <server-ip>
    User <user>
    IdentityFile ~/.ssh/id_ed25519
```

Now I can connect with:

```bash
ssh vserver
```

### 3. Disable Password Login

> **Important:** Make sure the login with the SSH key works **before** disabling the password login. Otherwise you can lock yourself out of the server.

Open the SSH server configuration:

```bash
sudo nano /etc/ssh/sshd_config
```

Set the following options:

```
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
```

Check that no file in `/etc/ssh/sshd_config.d/` overrides these settings:

```bash
sudo grep -r "PasswordAuthentication" /etc/ssh/sshd_config.d/
```

Validate the configuration and restart the SSH service so it loads the new settings:

```bash
sudo sshd -t
sudo systemctl restart ssh
```

I kept the current SSH session open and tested the login in a new terminal, so I could still fix the configuration if something went wrong.

### 4. Install NGINX

```bash
sudo apt update
sudo apt install nginx -y
sudo systemctl status nginx
```

The status shows `active (running)`. Opening `http://<server-ip>` in the browser shows the **"Welcome to nginx!"** page.

### 5. Serve a Custom HTML Page

Create a directory and the HTML page:

```bash
sudo mkdir -p /var/www/alternatives
sudo nano /var/www/alternatives/alternate-index.html
```

The page is a simple HTML document with a short description of the server setup.

Create a new NGINX site configuration:

```bash
sudo nano /etc/nginx/sites-available/alternatives
```

```nginx
server {
    listen 8081;
    listen [::]:8081;

    root /var/www/alternatives;
    index alternate-index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

Enable the site, test the configuration and reload NGINX:

```bash
sudo ln -s /etc/nginx/sites-available/alternatives /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Result:

- `http://<server-ip>` shows the default NGINX welcome page
- `http://<server-ip>:8081` shows my custom HTML page

### 6. Configure Git

On the server, Git uses the same username and email address as on my local computer and on GitHub:

```bash
git config --global user.name "<github-username>"
git config --global user.email "<your-email@example.com>"
git config --global --list
```

### 7. Connect the Server to GitHub

To pull repositories from GitHub, I created a **separate** key pair **on the server**:

```bash
ssh-keygen -t ed25519 -C "vserver-github"
cat ~/.ssh/id_ed25519.pub
```

I added the public key on GitHub under **Settings → SSH and GPG keys → New SSH key**.

Test the connection and clone a repository:

```bash
ssh -T git@github.com
git clone git@github.com:<github-username>/learning-journal.git
```

GitHub answers with `Hi <github-username>! You've successfully authenticated...` and the repository is cloned to the server.

## Testing

| Test | Command | Expected result |
| --- | --- | --- |
| Login with SSH key | `ssh -i ~/.ssh/id_ed25519 -o PubkeyAuthentication=yes -o PasswordAuthentication=no <user>@<server-ip>` | Login works without a password |
| Login with password | `ssh -o PubkeyAuthentication=no <user>@<server-ip>` | `Permission denied (publickey)` |
| NGINX configuration | `sudo nginx -t` | `syntax is ok` / `test is successful` |
| NGINX default page | open `http://<server-ip>` | "Welcome to nginx!" |
| Custom HTML page | open `http://<server-ip>:8081` | my custom page |
| Git configuration | `git config --global --list` | same name and email as on GitHub |
| GitHub connection | `ssh -T git@github.com` | `successfully authenticated` |

## Checklist

The project checklist is available as PDF: [V-Server checklist](./checklist.pdf)