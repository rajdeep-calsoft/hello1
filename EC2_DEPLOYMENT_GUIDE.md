# EC2 Deployment Guide

## Step 1: Prepare Your Application
✅ Already done - your app is ready for Docker!

## Step 2: Launch EC2 Instance

### In AWS Console:
1. Go to **EC2 Dashboard** → **Launch Instances**
2. Choose **Amazon Linux 2** or **Ubuntu 22.04** (free tier eligible)
3. Instance type: **t2.micro** (free tier)
4. Storage: **30GB** (default)
5. **Security Group** - Add these inbound rules:
   - Type: HTTP, Port: 80, Source: 0.0.0.0/0
   - Type: Custom TCP, Port: 5000, Source: 0.0.0.0/0
   - Type: SSH, Port: 22, Source: YOUR_IP (or 0.0.0.0/0 for testing)
6. **Key Pair**: Download and save the .pem file safely
7. Launch!

## Step 3: Connect to EC2

### On Windows (PowerShell):
```powershell
# Navigate to where you saved the .pem file
cd C:\path\to\your\key

# Set permissions (if needed)
icacls "your-key.pem" /grant:r "$($env:USERNAME):(F)"

# Connect via SSH
ssh -i "your-key.pem" ec2-user@YOUR_EC2_PUBLIC_IP

# For Ubuntu:
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP
```

**Find YOUR_EC2_PUBLIC_IP**: AWS Console → Instances → Select your instance → Copy "Public IPv4 address"

## Step 4: Upload Code to EC2

### Option A: Using SCP (Simple Copy)
```powershell
# From your local machine, copy the entire project folder
scp -i "your-key.pem" -r "C:\Users\rajdeep.samanta\Desktop\App\hello-world-docker" ec2-user@YOUR_EC2_PUBLIC_IP:/home/ec2-user/

# For Ubuntu:
scp -i "your-key.pem" -r "C:\Users\rajdeep.samanta\Desktop\App\hello-world-docker" ubuntu@YOUR_EC2_PUBLIC_IP:/home/ubuntu/
```

### Option B: Using Git (Recommended if you have Git repo)
```bash
# SSH into EC2 first, then:
git clone https://github.com/YOUR_REPO/hello-world-docker.git
cd hello-world-docker
```

## Step 5: Install Docker & Docker Compose on EC2

### For Amazon Linux 2:
```bash
# SSH into your EC2 instance first

# Update system
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker -y
sudo systemctl start docker
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### For Ubuntu 22.04:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
sudo apt install -y docker.io docker-compose

# Start Docker
sudo systemctl start docker
sudo usermod -aG docker $USER

# Log out and log back in for group changes to take effect
exit
```

## Step 6: Navigate to Your Project & Start Services

```bash
# SSH back in (for Ubuntu after group change)
ssh -i "your-key.pem" ubuntu@YOUR_EC2_PUBLIC_IP

# Navigate to project
cd hello-world-docker

# Build and start containers
docker-compose up --build -d

# Verify containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

## Step 7: Access Your App

### Open in Browser:
- **Frontend**: http://YOUR_EC2_PUBLIC_IP (port 80)
- **Backend API**: http://YOUR_EC2_PUBLIC_IP:5000/api/hello

Example:
```
http://54.123.45.67
http://54.123.45.67:5000/api/hello
```

## Step 8: Useful Commands

```bash
# Stop containers
docker-compose down

# Restart containers
docker-compose restart

# View container logs
docker logs hello-world-backend
docker logs hello-world-frontend

# SSH into running container
docker exec -it hello-world-backend sh

# Remove everything
docker-compose down -v
```

## Troubleshooting

### Port 80 already in use?
Edit docker-compose.yml:
```yaml
frontend:
  build: ./frontend
  ports:
    - "8080:80"  # Use 8080 instead
```
Access at: http://YOUR_EC2_PUBLIC_IP:8080

### Can't connect to frontend?
```bash
# Check if containers are running
docker-compose ps

# Check logs
docker-compose logs

# Restart
docker-compose restart
```

### Need to update code?
```bash
# Pull latest code (if using Git)
git pull

# Rebuild and restart
docker-compose up --build -d
```

---

**NEXT STEPS:**
1. Launch EC2 instance ✓
2. Connect via SSH ✓
3. Upload project ✓
4. Install Docker ✓
5. Run `docker-compose up --build -d` ✓
6. Access via browser ✓
