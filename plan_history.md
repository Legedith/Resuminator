# Resuminator Project Plan

This document tracks the plan and progress for building the Resuminator web application.

## Initial Plan

1.  **Project Setup:**
    *   Set up a basic Python backend with FastAPI.
    *   Create a simple frontend structure with `index.html`, `style.css`, and `script.js`.
    *   Install necessary dependencies using `uv`.

2.  **File Upload Functionality:**
    *   Create an HTML form for file uploads.
    *   Implement a backend endpoint to receive and store the uploaded file (`.docx` or `.tex`).

3.  **Docx to LaTeX Conversion:**
    *   Implement the logic to parse `.docx` files.
    *   Create a basic LaTeX resume template.
    *   Populate the template with data extracted from the `.docx` file.

4.  **Core Chat Interface:**
    *   Build a basic chat UI on the frontend.
    *   Implement a backend endpoint to handle chat messages.
    *   Integrate with the OpenAI API to process user requests and modify the LaTeX code.

5.  **LaTeX Preview and Download:**
    *   Implement a function to compile the LaTeX code into a PDF on the backend.
    *   Create an endpoint to serve the generated PDF.
    *   Display the PDF preview on the frontend.
    *   Add a download button for the PDF.

6.  **Code Editor:**
    *   Add a code editor view (e.g., a `<textarea>` or a library like CodeMirror) to allow manual edits of the LaTeX code.
    *   Implement logic to update the backend when the code is changed manually.

7.  **Configuration:**
    *   Create a UI element to configure the OpenAI API key and model.
    *   Store the configuration securely.

8.  **Testing and Refinement:**
    *   Thoroughly test all features.
    *   Refine the UI/UX and backend logic based on testing.

## Progress

### Step 1: Project Setup
*   Completed the initial project setup. I have created a `main.py` with a basic FastAPI application, a `static` directory with `index.html`, `style.css`, and `script.js`, and installed the necessary Python dependencies using `uv`.

### Step 2: File Upload Functionality
*   The file upload functionality is implemented. The backend can receive and store `.docx` and `.tex` files, and the frontend has a working file upload form.

### Step 3: Docx to LaTeX Conversion
*   Implemented the `.docx` to `.tex` conversion functionality. The backend now parses uploaded `.docx` files, populates a LaTeX template, and saves the result as a `.tex` file.

### Step 4: Core Chat Interface
*   The core chat interface is now fully functional. The frontend can send messages, receive responses, and display the updated LaTeX code in the code editor. View switching between code and preview is also implemented.

### Step 5: LaTeX Preview and Download
*   Installed `texlive-latex-base` for PDF generation.
*   Added a `/compile` endpoint to the FastAPI backend that uses `pdflatex` to convert `.tex` files to PDF.
*   Updated the frontend to display the generated PDF in an iframe and added a button to download the PDF.

### Step 6: Code Editor
*   Added a textarea to `index.html` to serve as a code editor for the LaTeX source.
*   Implemented a `/save/{filename}` endpoint in `main.py` to save changes made in the editor.
*   Added JavaScript code to send the updated LaTeX to the backend and refresh the preview when changes are made.

### Step 7: Configuration
*   Added a configuration section to `index.html` for the user to input their OpenAI API key and model name.
*   Implemented a `/configure` endpoint in `main.py` to receive and store the configuration.
*   The frontend sends the configuration to the backend when the "Save Configuration" button is clicked.

### Step 6: Code Editor
*   Added a textarea to `index.html` to serve as a code editor for the LaTeX source.
*   Implemented a `/save/{filename}` endpoint in `main.py` to save changes made in the editor.
*   Added JavaScript code to send the updated LaTeX to the backend and refresh the preview when changes are made.