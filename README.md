# Resuminator

Resuminator is a web-based application that helps you create and edit your resume using a combination of a user-friendly interface and the power of AI. You can either upload an existing resume in `.docx` or `.tex` format, or start from scratch with a provided template. The application then allows you to interact with an AI assistant to make changes to your resume, and you can also directly edit the LaTeX code. Once you're satisfied with the result, you can download a professionally formatted PDF of your resume.

## Features

*   **File Upload:** Supports both `.docx` and `.tex` file formats.
*   **DOCX to LaTeX Conversion:** Automatically converts `.docx` files to a standard LaTeX resume format.
*   **AI-Powered Editing:** Use a chat interface to communicate with an AI assistant and make changes to your resume.
*   **Live Preview:** See a real-time preview of your resume as you make changes.
*   **Code Editor:** For advanced users, an integrated code editor allows for direct manipulation of the LaTeX source.
*   **Download as PDF:** Download your finished resume as a high-quality PDF document.

## Setup and Installation

1.  **Prerequisites:**
    *   Python 3.12 or higher
    *   `pip` and `venv`
    *   A LaTeX distribution (e.g., TeX Live)

2.  **Installation:**
    *   Clone the repository:
        ```
        git clone https://github.com/your-username/resuminator.git
        cd resuminator
        ```
    *   Create a virtual environment:
        ```
        python3 -m venv venv
        ```
    *   Activate the virtual environment:
        *   On macOS and Linux: `source venv/bin/activate`
        *   On Windows: `.\venv\Scripts\activate`
    *   Install the required Python packages:
        ```
        pip install -r requirements.txt
        ```
    *   Install a LaTeX distribution. On Debian-based systems, you can use:
        ```
        sudo apt-get update && sudo apt-get install -y texlive-latex-base texlive-fonts-recommended
        ```
3. **Running the Application:**
    *   Start the FastAPI server:
    ```bash
    uvicorn main:app --host 0.0.0.0 --port 8000
    ```
    *   Open your web browser and navigate to `http://localhost:8000`.

## Known Issues
*   The application currently has a known issue with the installation of LaTeX dependencies in some environments, which may prevent the PDF compilation feature from working correctly.

## Future Development
*   Improve the robustness of the DOCX to LaTeX conversion.
*   Enhance the chat interface with more advanced features and a more natural language understanding.
*   Add more resume templates to choose from.
*   Implement user accounts to save and manage multiple resumes.
*   Improve error handling and provide more informative feedback to the user.

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.