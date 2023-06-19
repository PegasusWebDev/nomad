export default {
    path: './assets/game/',
    tilesize: 7,
    tiles: [
        { name:"deep_water", symmetry:"X" },
        { name:"grass", symmetry:"X" },
        { name:"peaks", symmetry:"X" },
        { name:"rocks", symmetry:"X" },
        { name:"sand", symmetry:"X" },
        { name:"scarce_grass", symmetry:"X" },
        { name:"water", symmetry:"X" }
    ],
    neighbors: [
        { left:"deep_water", right:"water", anyrot: true },
        { left:"water", right:"sand", anyrot: true },
        { left: "sand", right: "scarce_grass", anyrot: true },
        { left: "scarce_grass", right: "grass", anyrot: true },
        { left: "grass", right: "rocks", anyrot: true },
        { left: "rocks", right: "peaks", anyrot: true },
        { left:"deep_water", right:"deep_water", anyrot: true },
        { left:"grass", right:"grass", anyrot: true },
        { left:"peaks", right:"peaks", anyrot: true },
        { left:"rocks", right:"rocks", anyrot: true },
        { left:"sand", right:"sand", anyrot: true },
        { left:"scarce_grass", right:"scarce_grass", anyrot: true },
        { left:"water", right:"water", anyrot: true },
    ]
}