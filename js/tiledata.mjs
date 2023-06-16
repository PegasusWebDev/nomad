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
        { left: "sand", right: "scarce_grass" },
        { left: "scarce_grass", right: "grass" },
        { left: "grass", right: "rocks" },
        { left: "rocks", right: "peaks" }
    ]
}