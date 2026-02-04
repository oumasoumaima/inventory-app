# AWS Deployment Guide for Inventory Management App

This guide walks you through deploying your application to AWS EC2 using the Free Tier.

## prerequisites
- An AWS Account (Free Tier eligible).
- The code pushed to your GitHub repository (already done!).

---

## Step 1: Launch an EC2 Instance

1.  Log in to the **AWS Management Console**.
2.  Navigate to **EC2** service.
3.  Click **Launch Instance**.
4.  **Name**: `InventoryApp`
5.  **AMI**: Select **Amazon Linux 2 AMI (HVM)** (Free Tier eligible).
6.  **Instance Type**: Select **t2.micro** (Free Tier eligible).
7.  **Key Pair**: Create a new key pair (e.g., `inventory-key`) and download the `.pem` file. **Keep this safe!**
8.  **Network Settings**:
    - Allow SSH traffic from Anywhere (0.0.0.0/0).
    - Allow HTTP traffic from the internet.
    - Allow HTTPS traffic from the internet.
9.  **Advanced Details (User Data)**:
    - Scroll down to the bottom.
    - Copy and paste the script below into the **User Data** box. This script installs Docker, Docker Compose, and Git automatically when the server starts.

    ```bash
    #!/bin/bash
    sudo yum update -y
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -a -G docker ec2-user
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo yum install git -y
    ```
10. Click **Launch Instance**.

---

## Step 2: Connect to Your Instance

1.  Wait for the **Instance State** to turn `Running`.
2.  Select the instance and click **Connect**.
3.  Use the **EC2 Instance Connect** tab (easiest method) and click **Connect**. A terminal window will open in your browser.

---

## Step 3: Deploy the Application

Run the following commands in the EC2 terminal:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/oumasoumaima/inventory-app.git
    ```

2.  **Navigate to the Folder**:
    ```bash
    cd inventory-app
    ```

3.  **Start the Application**:
    ```bash
    docker-compose up -d --build
    ```

    *This command will build the images for the Client and Server and start them in the background.*

---

## Step 4: Access the Application

1.  Go back to the AWS Console (EC2 Dashboard).
2.  Find the **Public IPv4 address** of your instance.
3.  Open a new browser tab and go to: `http://<YOUR_PUBLIC_IP>`
    *(Example: http://54.123.45.67)*

**Success!** You should see your Inventory Management application running.

---

## Troubleshooting

- **Site not loading?**
    - Check the **Security Group** of your instance. Ensure **Inbound Rules** allow **HTTP (Port 80)** from `0.0.0.0/0`.
- **Logs?**
    - To see server logs: `docker-compose logs -f server`
    - To see client logs: `docker-compose logs -f client`
