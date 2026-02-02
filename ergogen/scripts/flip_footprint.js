const fs = require('fs');

try {
    let content = fs.readFileSync('footprints/nice_nano.js', 'utf8');

    console.log("Read nice_nano.js");

    // 1. Change Module Layer
    // Note: KiCad modules are usually defined on F.Cu. 
    // Changing this to B.Cu might just default the view, but let's do it.
    content = content.replace('(layer F.Cu)', '(layer B.Cu)');

    // 2. Flip X coordinates for geometry (start/end) and placement (at)
    // Regex matches: (start X, (end X, (at X
    // It handles negative and positive float numbers.
    content = content.replace(/\((start|end|at) ([-\d\.]+)/g, (match, cmd, x) => {
        const val = parseFloat(x);
        // Don't flip 0 to -0 just for cleanliness, though JS handles it.
        const newX = val === 0 ? 0 : -val;
        return `(${cmd} ${newX}`;
    });

    // 3. Swap Layers for lines and text
    // F.SilkS -> B.SilkS
    // B.SilkS -> F.SilkS
    // We use a placeholder to avoid double-swapping
    content = content.replace(/F\.SilkS/g, 'TEMP_LAYER');
    content = content.replace(/B\.SilkS/g, 'F.SilkS');
    content = content.replace(/TEMP_LAYER/g, 'B.SilkS');

    // 4. Update Description
    content = content.replace('nice_nano', 'nice_nano_back');
    content = content.replace('value nice_nano', 'value nice_nano_back');

    fs.writeFileSync('footprints/nice_nano_back.js', content);
    console.log("Created footprints/nice_nano_back.js");

} catch (err) {
    console.error("Error:", err);
}
