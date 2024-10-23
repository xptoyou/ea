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
        // Use eval to execute the generated JavaScript code
        const output = eval(code);
        document.getElementById('output').textContent = output || "Code executed successfully!";
    } catch (e) {
        document.getElementById('output').textContent = `Error: ${e.message}`;
    }
});

// Save workspace to localStorage
function saveWorkspace() {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xmlText = Blockly.Xml.domToText(xml);
    localStorage.setItem('seifWorkspace', xmlText);
    alert('Workspace saved!');
}

// Load workspace from localStorage
function loadWorkspace() {
    const xmlText = localStorage.getItem('seifWorkspace');
    if (xmlText) {
        const xml = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(xml, workspace);
        alert('Workspace loaded!');
    } else {
        alert('No saved workspace found.');
    }
}

// Add event listeners for save/load buttons
document.getElementById('saveCode').addEventListener('click', saveWorkspace);
document.getElementById('loadCode').addEventListener('click', loadWorkspace);

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
