var baseDmg, knockbackDmg, totalDmg;
var comboDmg = 0;
const lureKnockback = 0.5;
const presLureKnockback = 0.65;

function calculateDamageOld() {
    // Kept for old index
    baseDmg = document.querySelector("#baseDmg").value;
    
    const lureCheckbox = document.querySelector("#isLured");
    const presLureCheckbox = document.querySelector("#isPresLured");

    if(lureCheckbox.checked) {
        knockbackDmg = baseDmg * 0.5;
    } else if(presLureCheckbox.checked) {
        knockbackDmg = baseDmg * 0.65;
    } else {
        knockbackDmg = 0;
    }

    document.querySelector("#amountToons").valueAsNumber > 1 ? comboDmg = baseDmg * 0.2 : comboDmg = 0;

    totalDmg = Number(baseDmg) + Number(knockbackDmg) + comboDmg;

    document.querySelector("#totalDmg").innerHTML = Math.ceil(totalDmg);

    console.log("Base Damage: " + baseDmg);
    console.log("Knockback Damage: " + knockbackDmg);
    console.log("Combo Damage: " + comboDmg);
}

function calculateDamage() {
    // Variables
    var baseDmg, totalDmg;
    var knockbackDmg, comboDmg = 0;
    const lureKb = 0.5;
    const presLureKb = 0.65;

    var cog1Gags = [];
    var cog2Gags = [];
    var cog3Gags = [];
    var cog4Gags = [];


    // Cogs
    const cog1 = {
        lureType: document.querySelector("#isLured1").checked ? "normal" : document.querySelector("#isPresLured1").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked1").checked,
        damage: 0
    }

    const cog2 = {
        lureType: document.querySelector("#isLured2").checked ? "normal" : document.querySelector("#isPresLured2").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked2").checked,
        damage: 0
    }

    const cog3 = {
        lureType: document.querySelector("#isLured3").checked ? "normal" : document.querySelector("#isPresLured3").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked3").checked,
        damage: 0
    }

    const cog4 = {
        lureType: document.querySelector("#isLured4").checked ? "normal" : document.querySelector("#isPresLured4").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked4").checked,
        damage: 0
    }

    // Toons
    const toon1 = {
        damage: document.querySelector("#toon1Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType1").options[document.querySelector("#gagType1").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget1").options[document.querySelector("#cogTarget1").selectedIndex].value,
        isPres: document.querySelector("#isPres1").checked
    }

    const toon2 = {
        damage: document.querySelector("#toon2Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType2").options[document.querySelector("#gagType2").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget2").options[document.querySelector("#cogTarget2").selectedIndex].value,
        isPres: document.querySelector("#isPres2").checked
    }

    const toon3 = {
        damage: document.querySelector("#toon3Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType3").options[document.querySelector("#gagType3").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget3").options[document.querySelector("#cogTarget3").selectedIndex].value,
        isPres: document.querySelector("#isPres3").checked
    }
    
    const toon4 = {
        damage: document.querySelector("#toon4Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType4").options[document.querySelector("#gagType4").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget4").options[document.querySelector("#cogTarget4").selectedIndex].value,
        isPres: document.querySelector("#isPres4").checked
    }

    // Actual data omg
    for(index = 0; index < 4; index++) {
        var toonIndex = index + 1;

        const currentToon = eval('toon' + toonIndex);

        baseDmg = currentToon.damage;
        
        switch(currentToon.cogTarget) {
            case('cog1'):
                var currentCog = cog1;
                cog1Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                break;
            case('cog2'):
                var currentCog = cog2;
                cog2Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                break;
            case('cog3'):
                var currentCog = cog3;
                cog3Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                break;
            case('cog4'):
                var currentCog = cog4;
                cog4Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                break;
        }
    }

    console.log(cog1Gags);

    findCombos(cog1Gags).then(combos => {
        console.log(combos);
        if(cog1.lureType !== 'none') combos[5] = 0;
        totalDmg = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        document.querySelector("#totalDmg1").innerHTML = totalDmg;
    });

    findCombos(cog2Gags).then(combos => {
        console.log(combos);
        if(cog2.lureType !== 'none') combos[5] = 0;
        totalDmg = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        document.querySelector("#totalDmg2").innerHTML = totalDmg;
    });

    findCombos(cog3Gags).then(combos => {
        console.log(combos);
        if(cog3.lureType !== 'none') combos[5] = 0;
        totalDmg = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        document.querySelector("#totalDmg3").innerHTML = totalDmg;
    });

    findCombos(cog4Gags).then(combos => {
        console.log(combos);
        if(cog4.lureType !== 'none') combos[5] = 0;
        totalDmg = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        document.querySelector("#totalDmg4").innerHTML = totalDmg;
    });
}

async function findCombos(gagArray) {
    var trapDmg = [];
    var soundDmg = [];
    var squirtDmg = [];
    var zapDmg = [];
    var throwDmg = [];
    var dropDmg = [];
    var dropsIfCombo = [];
    var allDmg = []

    const checkGags = new Promise((res, rej) => {
            for(gag in gagArray) {
                switch(gagArray[gag].gagType) {
                    case('trap'):
                        trapDmg.push(gagArray[gag].gagDamage);
                        break;
                    case('sound'):
                        soundDmg.push(gagArray[gag].gagDamage);
                        break;
                    case('squirt'):
                        squirtDmg.push(gagArray[gag].gagDamage);
                        break;
                    case('zap'):
                        zapDmg.push(gagArray[gag].gagDamage);
                        break;
                    case('throw'):
                        throwDmg.push(gagArray[gag].gagDamage);
                        break;
                    case('drop'):
                        dropDmg.push(gagArray[gag].gagDamage);
                        dropsIfCombo.push(gagArray[gag].isPres == true ? 0.15 : 0.1);
                        break;
                }
            }
        res();
    });

    function calculateDrop() {
        var countDecimals = function(value) {
            let text = value.toString()
            // verify if number 0.000005 is represented as "5e-6"
            if (text.indexOf('e-') > -1) {
              let [base, trail] = text.split('e-');
              let deg = parseInt(trail, 10);
              return deg;
            }
            // count decimals for number in representation like "0.123456"
            if (Math.floor(value) !== value) {
              return value.toString().split(".")[1].length || 0;
            }
            return 0;
        }

        var totalDropDmg = Math.ceil(dropDmg.reduce((r,c) => r + parseFloat(c), 0)) * (1.1 + dropsIfCombo.reduce((r,c) => r + parseFloat(c), 0));
        if(countDecimals(totalDropDmg) > 10) totalDropDmg = Math.floor(Math.ceil(dropDmg.reduce((r,c) => r + parseFloat(c), 0)) * (1.1 + dropsIfCombo.reduce((r,c) => r + parseFloat(c), 0)));

        return totalDropDmg;
    }

    return checkGags.then(() => {
        trapDmg.length > 1 ? allDmg.push(0) : trapDmg.length == 0 ? allDmg.push(0) : allDmg.push(trapDmg[0]);
        soundDmg.length > 1 ? allDmg.push(Math.ceil(soundDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : soundDmg.length == 0 ? allDmg.push(0) : allDmg.push(soundDmg[0])
        squirtDmg.length > 1 ? allDmg.push(Math.ceil(squirtDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : squirtDmg.length == 0 ? allDmg.push(0) : allDmg.push(squirtDmg[0])
        zapDmg.length > 1 ? allDmg.push(Math.ceil(zapDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : zapDmg.length == 0 ? allDmg.push(0) : allDmg.push(zapDmg[0])
        throwDmg.length > 1 ? allDmg.push(Math.ceil(throwDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : throwDmg.length == 0 ? allDmg.push(0) : allDmg.push(throwDmg[0])
        dropDmg.length > 1 ?
            allDmg.push(calculateDrop())
        : dropDmg.length == 0 ? allDmg.push(0) : allDmg.push(dropDmg[0])
    
        console.log(dropDmg);
        return allDmg;
    })
}

