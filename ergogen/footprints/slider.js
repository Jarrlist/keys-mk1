module.exports = {
    params: {
        designator: 'S',
        side: 'F',
        from: { type: 'net', value: 'from' },
        to: { type: 'net', value: 'to' }
    },
    body: p => {
        const side = p.side;
        const opp = side === 'B' ? 'F' : 'B';
        const mirror = side === 'B' ? '(justify mirror)' : '';
        const rot = p.rot || 0;

        // Pads on opposite side
        const layers = `"${opp}.Cu" "${opp}.Paste" "${opp}.Mask"`;

        return `
            (module "E73:SPDT_C128955" (layer ${side}.Cu) (tedit 6060E584)
                ${p.at}
                (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1.27 1.27) (thickness 0.15)) ${mirror}))
                (fp_text value "" (at 0 0) (layer ${side}.SilkS) hide (effects (font (size 1.27 1.27) (thickness 0.15)) ${mirror}))

                ${''/* Silkscreen Lines (simplified based on bounding box) */}
                (fp_line (start -3.3 -1.35) (end -3.3 1.5) (stroke (width 0.15) (type solid)) (layer ${side}.SilkS))
                (fp_line (start -3.3 1.5) (end 3.3 1.5) (stroke (width 0.15) (type solid)) (layer ${side}.SilkS))
                (fp_line (start 0 -1.35) (end -3.3 -1.35) (stroke (width 0.15) (type solid)) (layer ${side}.SilkS))
                (fp_line (start 0 -1.35) (end 3.3 -1.35) (stroke (width 0.15) (type solid)) (layer ${side}.SilkS))
                (fp_line (start 3.3 1.5) (end 3.3 -1.35) (stroke (width 0.15) (type solid)) (layer ${side}.SilkS))

                ${''/* Mounting Pads (Mechanical) */}
                (pad "" smd rect (at -3.7 -1.1 ${rot + 270}) (size 0.9 0.9) (layers ${layers}))
                (pad "" smd rect (at -3.7 1.1 ${rot + 270}) (size 0.9 0.9) (layers ${layers}))
                (pad "" smd rect (at 3.7 -1.1 ${rot + 270}) (size 0.9 0.9) (layers ${layers}))
                (pad "" smd rect (at 3.7 1.1 ${rot + 270}) (size 0.9 0.9) (layers ${layers}))

                ${''/* Alignment Holes */}
                (pad "" np_thru_hole circle (at -1.5 0 ${rot}) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))
                (pad "" np_thru_hole circle (at 1.5 0 ${rot}) (size 1 1) (drill 0.9) (layers *.Cu *.Mask))

                ${''/* Electrical Pins */}
                (pad "1" smd rect (at -2.25 2.075 ${rot + 270}) (size 0.9 1.25) (layers ${layers}) ${p.from.str})
                (pad "2" smd rect (at 0.75 2.075 ${rot + 270}) (size 0.9 1.25) (layers ${layers}) ${p.to.str})
                (pad "3" smd rect (at 2.25 2.075 ${rot + 270}) (size 0.9 1.25) (layers ${layers}))
            )
        `
    }
}