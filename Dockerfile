FROM python:3.9-slim

# Install Node.js for npm-managed JS dependencies
RUN apt-get update && apt-get install -y --no-install-recommends nodejs npm && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app
COPY . /app

RUN pip install --no-cache-dir -r requirements.txt
RUN npm install

# Change the port number to whatever you want
EXPOSE 8080
CMD ["python", "backend", "-p", "8080"]
