# Use a base image with Python 3.8 or superior
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the project files into the container
COPY . /app

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Expose the necessary port for the Flask server
EXPOSE 8080

# Define the command to run the Flask server with the ability to pass the port argument
CMD ["python", "backend", "-p", "8080"]