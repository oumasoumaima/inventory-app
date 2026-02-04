#!/bin/bash

# Update system packages
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Git
sudo yum install git -y

# Navigate to home directory
cd /home/ec2-user

# Clone Repository (User needs to replace this with their repo)
# git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
# cd inventory-dashboard

# Note: Since the code is not public, you might want to copy files manually or use a token.
# For now, we assume the user will upload the docker-compose.yml and code or clone via HTTPS/SSH.

# Make sure to create env files if not committed? 
# Our docker-compose sets most env vars, but secrets should be handled carefully.

# Run Docker Compose (Commented out until code is present)
# docker-compose up -d --build
