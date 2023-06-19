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
        { left:"deep_water", right:"water" },
        { left:"water", right:"sand" },
        { left: "sand", right: "scarce_grass"},
        { left: "scarce_grass", right: "grass"},
        { left: "grass", right: "rocks"},
        { left: "rocks", right: "peaks"},
        { left:"deep_water", right:"deep_water"},
        { left:"grass", right:"grass"},
        { left:"peaks", right:"peaks"},
        { left:"rocks", right:"rocks"},
        { left:"sand", right:"sand"},
        { left:"scarce_grass", right:"scarce_grass"},
        { left:"water", right:"water"},
    ]
}