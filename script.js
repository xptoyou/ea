// Function to execute the generated code
document.getElementById('runCode').addEventListener('click', function() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    try {
        // Use eval to execute the generated JavaScript code
        const output = eval(code);
        document.getElementById('output').textContent = output || "Code executed successfully!";
    } catch (e) {
        document.getElementById('output').textContent = `Error: ${e.message}`;
    }
});



