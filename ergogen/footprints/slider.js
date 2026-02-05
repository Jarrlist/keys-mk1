module.exports = {
    params: {
        designator: 'S',
        side: 'F',
        from: { type: 'net', value: 'from' },
        to: { type: 'net', value: 'to' }
    },
    body: p => {
        const side = p.side === 'B' ? 'B' : 'F';
        const mirror = p.side === 'B' ? '(justify mirror)' : '';
        return `
            (module SPDT_C128955 (layer ${side}.Cu) (tedit 6060E584)
                ${p.at}
                (fp_text reference "${p.ref}" (at 0 0) (layer ${side}.SilkS) ${p.ref_hide} (effects (font (size 1 1) (thickness 0.15)) ${mirror}))
                (pad 1 thru_hole rect (at -2.54 0 ${p.rot}) (size 1.5 2.5) (drill 0.9) (layers *.Cu *.Mask) ${p.from.str})
                (pad 2 thru_hole oval (at 0 0 ${p.rot}) (size 1.5 2.5) (drill 0.9) (layers *.Cu *.Mask) ${p.to.str})
                (pad 3 thru_hole oval (at 2.54 0 ${p.rot}) (size 1.5 2.5) (drill 0.9) (layers *.Cu *.Mask))
            )
        `
    }
}