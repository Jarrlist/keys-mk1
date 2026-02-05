// Nice!NanoV2 (Back Side)
module.exports = {
  params: {
    designator: 'MCU',
    orientation: 'down', // Orientation of the component itself
    RAW: {type: 'net', value: 'RAW'},
    GND: {type: 'net', value: 'GND'},
    RST: {type: 'net', value: 'RST'},
    VCC: {type: 'net', value: 'VCC'},
    P031: {type: 'net', value: 'P031'},
    P029: {type: 'net', value: 'P029'},
    P002: {type: 'net', value: 'P002'},
    P115: {type: 'net', value: 'P115'},
    P113: {type: 'net', value: 'P113'},
    P111: {type: 'net', value: 'P111'},
    P010: {type: 'net', value: 'P010'},
    P009: {type: 'net', value: 'P009'},
    P006: {type: 'net', value: 'P006'},
    P008: {type: 'net', value: 'P008'},
    P017: {type: 'net', value: 'P017'},
    P020: {type: 'net', value: 'P020'},
    P022: {type: 'net', value: 'P022'},
    P024: {type: 'net', value: 'P024'},
    P100: {type: 'net', value: 'P100'},
    P011: {type: 'net', value: 'P011'},
    P104: {type: 'net', value: 'P104'},
    P106: {type: 'net', value: 'P106'}
  },
  body: p => {
    const standard = `
      (module nice_nano_back (layer B.Cu) (tedit 6058B206)
      ${p.at /* parametric position */}

      ${'' /* footprint reference */}
      (fp_text reference "${p.ref}" (at 0 0) (layer B.SilkS) ${p.ref_hide} (effects (font (size 1.2 1.2) (thickness 0.2032)) (justify mirror)))
      (fp_text value nice_nano_back (at 0 0) (layer B.SilkS) hide (effects (font (size 1.2 1.2) (thickness 0.2032)) (justify mirror)))

      ${''/* component outline */}
      (fp_line (start 15.24 -8.89) (end -17.78 -8.89) (layer B.SilkS) (width 0.381))
      (fp_line (start 15.24 8.89) (end 15.24 -8.89) (layer B.SilkS) (width 0.381))
      (fp_line (start -17.78 8.89) (end 15.24 8.89) (layer B.SilkS) (width 0.381))
      (fp_line (start -17.78 -8.89) (end -17.78 8.89) (layer B.SilkS) (width 0.381))
      `
    function pins(def_neg, def_pos) {
      return `
        ${''/* pin names - Adjusted for Back view (mirrored justification) */}
        (fp_text user RAW (at -13.97 ${def_pos}5.473715 ${p.rot + 90}) (layer B.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
        (fp_text user GND (at -11.43 ${def_pos}5.454667 ${p.rot + 90}) (layer B.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
        (fp_text user RST (at -8.89 ${def_pos}5.588 ${p.rot + 90}) (layer B.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
        (fp_text user VCC (at -6.35 ${def_pos}5.537191 ${p.rot + 90}) (layer B.SilkS) (effects (font (size 0.8 0.8) (thickness 0.15)) (justify mirror)))
        
        ${''/* and now the actual pins */}
        (pad 1 thru_hole circle (at -13.97 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P006.str})
        (pad 2 thru_hole circle (at -11.43 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P008.str})
        (pad 3 thru_hole circle (at -8.89 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.GND.str})
        (pad 4 thru_hole circle (at -6.35 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.GND.str})
        (pad 5 thru_hole circle (at -3.81 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P017.str})
        (pad 6 thru_hole circle (at -1.27 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P020.str})
        (pad 7 thru_hole circle (at 1.27 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P022.str})
        (pad 8 thru_hole circle (at 3.81 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P024.str})
        (pad 9 thru_hole circle (at 6.35 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P100.str})
        (pad 10 thru_hole circle (at 8.89 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P011.str})
        (pad 11 thru_hole circle (at 11.43 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P104.str})
        (pad 12 thru_hole circle (at 13.97 ${def_neg}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P106.str})
        
        (pad 13 thru_hole circle (at 13.97 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P009.str})
        (pad 14 thru_hole circle (at 11.43 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P010.str})
        (pad 15 thru_hole circle (at 8.89 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P111.str})
        (pad 16 thru_hole circle (at 6.35 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P113.str})
        (pad 17 thru_hole circle (at 3.81 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P115.str})
        (pad 18 thru_hole circle (at 1.27 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P002.str})
        (pad 19 thru_hole circle (at -1.27 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P029.str})
        (pad 20 thru_hole circle (at -3.81 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.P031.str})
        (pad 21 thru_hole circle (at -6.35 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.VCC.str})
        (pad 22 thru_hole circle (at -8.89 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.RST.str})
        (pad 23 thru_hole circle (at -11.43 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.GND.str})
        (pad 24 thru_hole circle (at -13.97 ${def_pos}7.62) (size 1.7526 1.7526) (drill 1.0922) (layers *.Cu *.SilkS *.Mask) ${p.RAW.str})
        `
      }
      if(p.orientation == 'down') {
        return `
          ${standard}
          ${pins('-', '')})
          `
      } else {
        return `
          ${standard}
          ${pins('', '-')})
          `
      }
    }
  }