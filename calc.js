var cog1, cog2, cog3, cog4;
var toon1, toon2, toon3, toon4;
var cog1zap = 0;
var cog2zap = 0;
var cog3zap = 0;
var cog4zap = 0;
var cog1zapM = 0.0;
var cog2zapM = 0.0;
var cog3zapM = 0.0;
var cog4zapM = 0.0;

function calculateDamageOld() {
    var baseDmg, knockbackDmg, totalDmg;
    var comboDmg = 0;
    const lureKnockback = 0.5;
    const presLureKnockback = 0.65;

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
    var baseDmg;
    var totalDmg1, totalDmg2, totalDmg3, totalDmg4 = 0;
    var knockbackDmg, comboDmg = 0;
    const lureKb = 0.5;
    const presLureKb = 0.65;

    var cog1Gags = [];
    var cog2Gags = [];
    var cog3Gags = [];
    var cog4Gags = [];

    cog1zap = 0;
    cog2zap = 0;
    cog3zap = 0;
    cog4zap = 0;
    cog1zapM = 0.0;
    cog2zapM = 0.0;
    cog3zapM = 0.0;
    cog4zapM = 0.0;

    // Cogs
    cog1 = {
        id: 0,
        lureType: document.querySelector("#isLured1").checked ? "normal" : document.querySelector("#isPresLured1").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked1").checked,
        zapJumped: false,
        zapped: false,
        damage: 0
    }

    cog2 = {
        id: 1,
        lureType: document.querySelector("#isLured2").checked ? "normal" : document.querySelector("#isPresLured2").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked2").checked,
        zapJumped: false,
        zapped: false,
        damage: 0
    }

    cog3 = {
        id: 2,
        lureType: document.querySelector("#isLured3").checked ? "normal" : document.querySelector("#isPresLured3").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked3").checked,
        zapJumped: false,
        zapped: false,
        damage: 0
    }

    cog4 = {
        id: 3,
        lureType: document.querySelector("#isLured4").checked ? "normal" : document.querySelector("#isPresLured4").checked ? "prestieged" : "none",
        isSoaked: document.querySelector("#isSoaked4").checked,
        zapJumped: false,
        zapped: false,
        damage: 0
    }

    // Toons
    toon1 = {
        id: 0,
        damage: document.querySelector("#toon1Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType1").options[document.querySelector("#gagType1").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget1").options[document.querySelector("#cogTarget1").selectedIndex].value,
        isPres: document.querySelector("#isPres1").checked
    }

    toon2 = {
        id: 1,
        damage: document.querySelector("#toon2Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType2").options[document.querySelector("#gagType2").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget2").options[document.querySelector("#cogTarget2").selectedIndex].value,
        isPres: document.querySelector("#isPres2").checked
    }

    toon3 = {
        id: 2,
        damage: document.querySelector("#toon3Dmg").valueAsNumber,
        gagType: document.querySelector("#gagType3").options[document.querySelector("#gagType3").selectedIndex].value,
        cogTarget: document.querySelector("#cogTarget3").options[document.querySelector("#cogTarget3").selectedIndex].value,
        isPres: document.querySelector("#isPres3").checked
    }
    
    toon4 = {
        id: 3,
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
                if(currentToon.gagType === 'lure' && currentToon.isPres && cog1.lureType === 'none') cog1.lureType = 'prestieged';
                if(currentToon.gagType === 'lure' && !currentToon.isPres && cog1.lureType === 'none') cog1.lureType = 'normal';
                break;
            case('cog2'):
                var currentCog = cog2;
                cog2Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                if(currentToon.gagType === 'lure' && currentToon.isPres && cog2.lureType === 'none') cog2.lureType = 'prestieged';
                if(currentToon.gagType === 'lure' && !currentToon.isPres && cog2.lureType === 'none') cog2.lureType = 'normal';
                break;
            case('cog3'):
                var currentCog = cog3;
                cog3Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                if(currentToon.gagType === 'lure' && currentToon.isPres && cog3.lureType === 'none') cog3.lureType = 'prestieged';
                if(currentToon.gagType === 'lure' && !currentToon.isPres && cog3.lureType === 'none') cog3.lureType = 'normal';
                break;
            case('cog4'):
                var currentCog = cog4;
                cog4Gags.push({
                    gagType: currentToon.gagType,
                    gagDamage: currentToon.damage,
                    isPres: currentToon.isPres
                })
                if(currentToon.gagType === 'lure' && currentToon.isPres && cog4.lureType === 'none') cog4.lureType = 'prestieged';
                if(currentToon.gagType === 'lure' && !currentToon.isPres && cog4.lureType === 'none') cog4.lureType = 'normal';
                break;
        }
    }

    findCombos(cog1Gags, cog1, [cog1, cog2, cog3, cog4], [toon1, toon2, toon3, toon4]).then(combos => {
        var allGagTypes = cog1Gags.map(gag => {
            var gagName = '';
            if(gag.isPres) gagName = 'pres ';
            gagName += gag.gagType;
            return gagName;
        });

        cog1.damage = cog1zap * cog1zapM;
        //if(cog1.zapJumped) cog1.damage = cog1.damage / 2;

        if(allGagTypes.includes('sound') || allGagTypes.includes('pres sound') || allGagTypes.includes('zap') || allGagTypes.includes('pres zap')) cog1.lureType = 'none';

        if(cog1.lureType !== 'none' && (combos[0] === 0 && combos[1] === 0 && combos[2] === 0 && combos[3] === 0)) combos[4] = 0;

        if(cog1.lureType !== 'none') {
            for(combo in combos) {
                if(combos[combo] > 0 && allGagTypes[combo - 1] !== 'toonup' && allGagTypes[combo - 1]!== 'lure' && allGagTypes[combo - 1] !== 'pres toonup' && allGagTypes[combo - 1]!== 'pres lure' && allGagTypes[combo - 1] !== 'drop' && allGagTypes[combo - 1] !== 'pres drop') {
                    // if(allGagTypes[combo - 1] !== 'sound' && allGagTypes[combo - 1] !== 'zap' && allGagTypes[combo - 1] !== 'pres sound' && allGagTypes[combo - 1] !== 'zap')
                    combos[combo] = combos[combo] + (combos[combo] * (cog1.lureType === 'prestieged' ? 0.65 : 0.5));
                    cog1.lureType = 'none';
                    break;
                }
            }
        }

        cog1.combos = combos;
        totalDmg1 = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        cog1.damage += totalDmg1;
        document.querySelector("#totalDmg1").innerHTML = cog1.damage;
    });

    findCombos(cog2Gags, cog2, [cog1, cog2, cog3, cog4], [toon1, toon2, toon3, toon4]).then(combos => {
        var allGagTypes = cog2Gags.map(gag => {
            var gagName = '';
            if(gag.isPres) gagName = 'pres ';
            gagName += gag.gagType;
            return gagName;
        });

        cog2.damage = cog2zap * cog2zapM;
        //if(cog1.zapJumped) cog1.damage = cog2.damage / 2;

        if(allGagTypes.includes('sound') || allGagTypes.includes('pres sound') || allGagTypes.includes('zap') || allGagTypes.includes('pres zap')) cog2.lureType = 'none';

        if(cog2.lureType !== 'none' && (combos[0] === 0 && combos[1] === 0 && combos[2] === 0 && combos[3] === 0)) combos[4] = 0;

        if(cog2.lureType !== 'none') {
            for(combo in combos) {
                if(combos[combo] > 0 && allGagTypes[combo - 1] !== 'toonup' && allGagTypes[combo - 1]!== 'lure' && allGagTypes[combo - 1] !== 'pres toonup' && allGagTypes[combo - 1]!== 'pres lure' && allGagTypes[combo - 1] !== 'drop' && allGagTypes[combo - 1] !== 'pres drop') {
                    if(allGagTypes[combo - 1] !== 'sound' && allGagTypes[combo - 1] !== 'zap' && allGagTypes[combo - 1] !== 'pres sound' && allGagTypes[combo - 1] !== 'zap') combos[combo] = combos[combo] + (combos[combo] * (cog2.lureType === 'prestieged' ? 0.65 : 0.5));
                    cog1.lureType = 'none';
                    break;
                }
            }
        }

        cog2.combos = combos;
        totalDmg2 = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        cog2.damage += totalDmg2;
        document.querySelector("#totalDmg2").innerHTML = cog2.damage;
    });

    findCombos(cog3Gags, cog3, [cog1, cog2, cog3, cog4], [toon1, toon2, toon3, toon4]).then(combos => {
        var allGagTypes = cog3Gags.map(gag => {
            var gagName = '';
            if(gag.isPres) gagName = 'pres ';
            gagName += gag.gagType;
            return gagName;
        });

        cog3.damage = cog3zap * cog3zapM;

        if(allGagTypes.includes('sound') || allGagTypes.includes('pres sound') || allGagTypes.includes('zap') || allGagTypes.includes('pres zap')) cog3.lureType = 'none';

        if(cog3.lureType !== 'none' && (combos[0] === 0 && combos[1] === 0 && combos[2] === 0 && combos[3] === 0)) combos[4] = 0;

        if(cog3.lureType !== 'none') {
            for(combo in combos) {
                if(combos[combo] > 0 && allGagTypes[combo - 1] !== 'toonup' && allGagTypes[combo - 1]!== 'lure' && allGagTypes[combo - 1] !== 'pres toonup' && allGagTypes[combo - 1]!== 'pres lure' && allGagTypes[combo - 1] !== 'drop' && allGagTypes[combo - 1] !== 'pres drop') {
                    if(allGagTypes[combo - 1] !== 'sound' && allGagTypes[combo - 1] !== 'zap' && allGagTypes[combo - 1] !== 'pres sound' && allGagTypes[combo - 1] !== 'zap') combos[combo] = combos[combo] + (combos[combo] * (cog3.lureType === 'prestieged' ? 0.65 : 0.5));
                    cog1.lureType = 'none';
                    break;
                }
            }
        }

        cog3.combos = combos;
        totalDmg3 = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        cog3.damage += totalDmg3;
        document.querySelector("#totalDmg3").innerHTML = cog3.damage;
    });

    findCombos(cog4Gags, cog4, [cog1, cog2, cog3, cog4], [toon1, toon2, toon3, toon4]).then(combos => {
        var allGagTypes = cog4Gags.map(gag => {
            var gagName = '';
            if(gag.isPres) gagName = 'pres ';
            gagName += gag.gagType;
            return gagName;
        });

        cog4.damage = cog4zap * cog4zapM;

        if(allGagTypes.includes('sound') || allGagTypes.includes('pres sound') || allGagTypes.includes('zap') || allGagTypes.includes('pres zap')) cog4.lureType = 'none';

        if(cog4.lureType !== 'none' && (combos[0] === 0 && combos[1] === 0 && combos[2] === 0 && combos[3] === 0)) combos[4] = 0;

        if(cog4.lureType !== 'none') {
            for(combo in combos) {
                if(combos[combo] > 0 && allGagTypes[combo - 1] !== 'toonup' && allGagTypes[combo - 1]!== 'lure' && allGagTypes[combo - 1] !== 'pres toonup' && allGagTypes[combo - 1]!== 'pres lure' && allGagTypes[combo - 1] !== 'drop' && allGagTypes[combo - 1] !== 'pres drop') {
                    if(allGagTypes[combo - 1] !== 'sound' && allGagTypes[combo - 1] !== 'zap' && allGagTypes[combo - 1] !== 'pres sound' && allGagTypes[combo - 1] !== 'zap') combos[combo] = combos[combo] + (combos[combo] * (cog4.lureType === 'prestieged' ? 0.65 : 0.5));
                    cog1.lureType = 'none';
                    break;
                }
            }
        }

        cog4.combos = combos;
        totalDmg4 = Math.ceil(combos.reduce((r,c) => r + parseFloat(c), 0));
        cog4.damage += totalDmg4;
        document.querySelector("#totalDmg4").innerHTML = cog4.damage;
    });
}

async function findCombos(gagArray, currentCog, cogArray, toonArray) {
    var trapDmg = [];
    var soundDmg = [];
    var squirtDmg = [];

    var zapDmg = [];
    var zapCogs = [];
    var zapPres = [];

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
                        zapCogs.push(currentCog);
                        zapPres.push(gagArray[gag].isPres);
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

    // Zap needs its own function because of jumps and all that
    async function calculateZapDamage(cogArray, toonArray) {
        var zapPosition = 0;

        if(zapDmg.length == 0 || zapDmg.reduce((r,c) => r + parseFloat(c), 0) == 0) return;
        const getZapDmg = new Promise((resolve, reject) => {
            for(cog in zapCogs) {
                // If the cog is soaked, continue
                if(zapCogs[Number(cog)].isSoaked) {
                    // Get the position of the current cog to zap
                    zapPosition = zapCogs[Number(cog)].id;
                    // Add base zap damage to the cog
                    window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[Number(cog)]

                    // If the cog hasn't been zapped, zap it
                    if(zapCogs[Number(cog)].zapped == false) {
                        // I genuinely don't remember what this does but I'm afraid to remove it
                        // EDIT: YOU FOOL THIS IS THE ZAP MULTIPLIER
                        window['cog' + (zapPosition + 1) + 'zapM'] = 3;
                        // Cog has been zapped
                        window['cog' + (zapPosition + 1)].zapped = true;
    
                        // Go left
                        if(zapPosition - 1 >= 0 && cogArray[zapPosition - 1]) {
                            // If a cog isn't soaked or it's already been jumped, skip it
                            if(cogArray[zapPosition - 1].isSoaked === false || cogArray[zapPosition - 1].zapJumped) return;
                            // You might think "why are you subtracting if you're just gonna add one later on anyway" and you'd be right,
                            // there is no more to that. I'm not redoing this because, to be honest, I just don't want to
                            // This code is leaving a mental scar in me, fuck zapping
                            zapPosition -= 1
                            // If the cog hasn't been zapped, zap it and add damage
                            if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                            // If the cog hasn't had a multiplier added to it yet, add it
                            if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.5 : 2.25;
                            // Cog has been zap jumped
                            window['cog' + (zapPosition + 1)].zapJumped = true;
    
                            // Go left
                            if((zapPosition - 1) >= 0 && cogArray[zapPosition - 1]) {

                                if(cogArray[zapPosition - 1].isSoaked === false) return;
                                if(cogArray[zapPosition - 1].zapJumped) {
                                    if(cogArray[zapPosition + 2].isSoaked === false || cogArray[zapPosition + 2].zapJumped) return;
                                    zapPosition += 2
                                    if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                                    if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.25 : 1.5;
                                    window['cog' + (zapPosition + 1)].zapJumped = true;
                                }

                                zapPosition -= 1
                                if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                                if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.25 : 1.5;
                                window['cog' + (zapPosition + 1)].zapJumped = true;
    
                            // Go right two times
                            } else if((zapPosition - 1) < 0 && cogArray[zapPosition + 1]) {
                                if(cogArray[zapPosition + 2].isSoaked === false || cogArray[zapPosition + 2].zapJumped) return;
                                zapPosition += 2
                                if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                                if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.25 : 1.5;
                                window['cog' + (zapPosition + 1)].zapJumped = true;
                            }
                        // Go right
                        } else if((zapPosition - 1) < 0 && cogArray[zapPosition + 1]) {
                            if(cogArray[zapPosition + 1].isSoaked === false || cogArray[zapPosition + 1].zapJumped) return;
                            zapPosition += 1
                            if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                            if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.5 : 2.25;
                            window['cog' + (zapPosition + 1)].zapJumped = true;
    
                            if(zapPosition + 1 <= 3 && cogArray[zapPosition + 1]) {
                                if(cogArray[zapPosition + 1].isSoaked === false || cogArray[zapPosition + 1].zapJumped) return;
                                zapPosition += 1
                                if(window['cog' + (zapPosition + 1)].zapped == false) window['cog' + (zapPosition + 1) + 'zap'] += zapDmg[cog];
                                if(window['cog' + (zapPosition + 1) + 'zapM'] === 0) window['cog' + (zapPosition + 1) + 'zapM'] = zapPres[zapPosition] === true ? 2.25 : 1.5;
                                window['cog' + (zapPosition + 1)].zapJumped = true;
    
                            }
                        }
                    }
                }
            }

            resolve();
        });

        return await getZapDmg;
    }

    return checkGags.then(() => {
        trapDmg.length > 1 ? allDmg.push(0) : trapDmg.length == 0 ? allDmg.push(0) : allDmg.push(trapDmg[0]);
        soundDmg.length > 1 ? allDmg.push(Math.ceil(soundDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : soundDmg.length == 0 ? allDmg.push(0) : allDmg.push(soundDmg[0])
        squirtDmg.length > 1 ? allDmg.push(Math.ceil(squirtDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : squirtDmg.length == 0 ? allDmg.push(0) : allDmg.push(squirtDmg[0])
        zapDmg.length > 0 ? calculateZapDamage(cogArray, toonArray) : 0;
        throwDmg.length > 1 ? allDmg.push(Math.ceil(throwDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2)) : throwDmg.length == 0 ? allDmg.push(0) : allDmg.push(throwDmg[0])
        dropDmg.length > 1 ?
            allDmg.push(calculateDrop())
        : dropDmg.length == 0 ? allDmg.push(0) : allDmg.push(dropDmg[0]);

        return allDmg;
    })
}

console.log('App ready.');