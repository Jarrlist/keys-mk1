module.exports = {
    params: {
        designator: 'JST',
        side: 'F',
        pos: { type: 'net', value: 'pos' },
        neg: { type: 'net', value: 'neg' }
    },
    body: p => {
        const side = p.side === 'B' ? 'B' : 'F';
        const mirror = p.side === 'B' ? '(justify mirror)' : '';
        return `
            (module JST_PH_S2B-PH-K (layer ${side}.Cu) (tedit 6060E584)
                ${p.at}
                (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${mirror}))
                (fp_text value "" (at 0 0) (layer ${side}.Fab) hide (effects (font (size 1 1) (thickness 0.15)) ${mirror}))
                
                ${''/* Silkscreen Outline */}
                (fp_line (start -2.95 -1.35) (end -2.95 6.25) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start -2.95 6.25) (end 2.95 6.25) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start 2.95 6.25) (end 2.95 -1.35) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start 2.95 -1.35) (end -2.95 -1.35) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start -1.5 6.25) (end -1.5 1.25) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start 1.5 6.25) (end 1.5 1.25) (layer ${side}.SilkS) (width 0.15))
                (fp_line (start -1.5 1.25) (end 1.5 1.25) (layer ${side}.SilkS) (width 0.15))

                (pad 1 thru_hole rect (at -1 0 ${p.rot}) (size 1.2 1.7) (drill 0.8) (layers *.Cu *.Mask) ${p.pos.str})
                (pad 2 thru_hole oval (at 1 0 ${p.rot}) (size 1.2 1.7) (drill 0.8) (layers *.Cu *.Mask) ${p.neg.str})
            )
        `
    }
}