// Initialize the Blockly workspace
const toolbox = `
    <xml>
        <category name="Control" colour="120">
            <block type="controls_if"></block>
            <block type="controls_repeat_ext"></block>
        </category>
        <category name="Math" colour="230">
            <block type="math_number"></block>
            <block type="math_arithmetic"></block>
            <block type="seif_square"></block>
        </category>
        <category name="Strings" colour="160">
            <block type="seif_join"></block>
        </category>
    </xml>
`;

const workspace = Blockly.inject('blocklyDiv', { toolbox });

// Function to execute the generated code
document.getElementById('runCode').addEventListener('click', function() {
    const code = Blockly.JavaScript.workspaceToCode(workspace);
    try {
        const output = eval(code);
        document.getElementById('output').textContent = output || "Code executed successfully!";
    } catch (e) {
        document.getElementById('output').textContent = `Error: ${e.message}`;
    }
});

// Custom blocks for Seif
Blockly.Blocks['seif_square'] = {
    init: function() {
        this.appendValueInput("NUMBER")
            .setCheck("Number")
            .appendField("square of");
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip("Returns the square of a number.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['seif_square'] = function(block) {
    const number = Blockly.JavaScript.valueToCode(block, 'NUMBER', Blockly.JavaScript.ORDER_NONE);
    const code = `Math.pow(${number}, 2)`;
    return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

// Custom string block for joining two strings
Blockly.Blocks['seif_join'] = {
    init: function() {
        this.appendValueInput("STRING1")
            .setCheck("String")
            .appendField("join");
        this.appendValueInput("STRING2")
            .setCheck("String")
            .appendField("and");
        this.setOutput(true, "String");
        this.setColour(160);
        this.setTooltip("Joins two strings together.");
        this.setHelpUrl("");
    }
};

Blockly.JavaScript['seif_join'] = function(block) {
    const string1 = Blockly.JavaScript.valueToCode(block, 'STRING1', Blockly.JavaScript.ORDER_NONE);
    const string2 = Blockly.JavaScript.valueToCode(block, 'STRING2', Blockly.JavaScript.ORDER_NONE);
    const code = `${string1} + ${string2}`;
    return [code, Blockly.JavaScript.ORDER_ADDITION];
};

// Function to download the workspace as a weeb
document.getElementById('downloadCode').addEventListener('click', function() {
    const html = Blockly.html.workspaceToDom(workspace);
    const blob = new Blob([xmlText], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'seif_workspace.html';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
});




