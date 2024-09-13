# CVBuilder

The goal of this project is to create a tool that allows users to create their own CVs. 
The tool will be able to generate a PDF file taking into account the changes 
made in the live version. You just need to fill in the `content.json` file 
with your personal information and the tool will generate the CV for you.

Feel free to clone, fork or do whatever you want with this project. No need to ask for permission. 
If you want to see a live version of this project, you can take a look at my CV at [jaimeboixados.com](https://jaimeboixados.com).

## Prerequisites
* Python 3.9 or superior

## How it works

The tool is a simple Flask application that reads the `content.json` file and 
renders the information in the `cv.html` template. The user can modify the
information in the live version and download the CV as a PDF file.

## Installation

Launch the following command in your terminal:

```bash
pip install -r requirements.txt
```

## Run

To run the program, launch the following command in your terminal:

```bash
python backend
```

For the help guide use the following command:

```bash
python backend --help
```

## Docker

**Build the Docker Image**

To build the Docker image, run the following command in your terminal:

```bash
docker build -t cvbuilder .
```

**Run the Docker Container**

To run the Docker container, use the following command:

```bash
docker run -p 8080:8080 cvbuilder
```