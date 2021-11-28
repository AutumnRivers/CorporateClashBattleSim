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

function elementsCount(elementToFind, total, number){
    return total += number==elementToFind;
}

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

async function calculateDamage() {
    // Variables
    const lureKb = 0.5;
    const presLureKb = 0.65;

    cog1zap = 0;
    cog2zap = 0;
    cog3zap = 0;
    cog4zap = 0;
    cog1zapM = 0.0;
    cog2zapM = 0.0;
    cog3zapM = 0.0;
    cog4zapM = 0.0;

    function getLureType(id) {
        return document.querySelector("#isLured" + id).checked ? "normal" : document.querySelector("#isPresLured1").checked ? "prestieged" : "none";
    }

    function getSoakedCheckbox(id) {
        return document.querySelector("#isSoaked" + id).checked;
    }

    // Cog class
    class Cog {
        constructor(id, lureType, isSoaked, zapJumped, zapped, gagDamages, totalDamage) {
            this.id = id;
            this.lureType = lureType;
            this.isSoaked = isSoaked;
            this.zapJumped = zapJumped;
            this.zapped = zapped;
            this.gagDamages = gagDamages;
            this.totalDamage = totalDamage;
            this.zapMultiplier = 0;
            this.combos = [];
            this.sounded = false;
        }

        addToZapMultiplier(multi) {
            this.zapMultiplier += multi;
        }

        set setCombos(combosObject) {
            this.combos = Object.entries(combosObject);
        }
    }

    // Cogs
    cog1 = new Cog(1, getLureType(1), getSoakedCheckbox(1), false, false, [], 0);
    cog2 = new Cog(2, getLureType(2), getSoakedCheckbox(2), false, false, [], 0);
    cog3 = new Cog(3, getLureType(3), getSoakedCheckbox(3), false, false, [], 0);
    cog4 = new Cog(4, getLureType(4), getSoakedCheckbox(4), false, false, [], 0);

    const allCogs = [cog1, cog2, cog3, cog4];

    // Toon class
    class Toon {
        constructor(id) {
            this.id = id;
            this.damage = document.querySelector(`#toon${id}Dmg`).valueAsNumber;
            this.gagType = document.querySelector("#gagType" + id).options[document.querySelector("#gagType" + id).selectedIndex].value;
            this.cogTarget = Number(document.querySelector("#cogTarget" + id).options[document.querySelector("#cogTarget" + id).selectedIndex].value) - 1;
            this.isPres = document.querySelector("#isPres" + id).checked;
        }
    }

    // Toons
    toon1 = new Toon(1);
    toon2 = new Toon(2);
    toon3 = new Toon(3);
    toon4 = new Toon(4);

    const allToons = [toon1, toon2, toon3, toon4];

    // Actual data omg
    for(index = 0; index < 4; index++) {
        const currentToon = allToons[index];

        baseDmg = currentToon.damage;

        allCogs[currentToon.cogTarget].gagDamages.push({
            gagType: currentToon.gagType,
            gagDamage: currentToon.damage,
            isPres: currentToon.isPres
        });

        if(currentToon.gagType === 'lure' && currentToon.isPres && allCogs[currentToon.cogTarget].lureType === 'none') allCogs[currentToon.cogTarget].lureType = 'prestieged';
        if(currentToon.gagType === 'lure' && !currentToon.isPres && allCogs[currentToon.cogTarget].lureType === 'none') allCogs[currentToon.cogTarget].lureType = 'normal';
    }

    for(index = 0; index < 4; index++) {
        const currentCog = allCogs[index];

        findCombos(currentCog.gagDamages, currentCog, allCogs, allToons).then(combos => {
            var allGagTypes = currentCog.gagDamages.map(gag => {
                var gagName = '';
                if(gag.isPres) gagName = 'pres ';
                gagName += gag.gagType;
                return gagName;
            });
    
            const currentCogZap = currentCog.gagDamages.find(gags => gags.gagType == 'zap');
    
            if(currentCogZap) currentCog.totalDamage += currentCogZap.gagDamage * currentCog.zapMultiplier;
    
            if(allGagTypes.includes('sound') || allGagTypes.includes('pres sound') || allGagTypes.includes('zap') || allGagTypes.includes('pres zap')) cog1.lureType = 'none';
    
            if(allGagTypes.includes('trap')) combos.trapDmg = allGagTypes.reduce(elementsCount.bind(this, 'trap'), 0) >= 2 ? 0 : combos.trapDmg;

            if(currentCog.lureType !== 'none') {
                if(combos.trapDmg > 0 || combos.soundDmg > 0 || combos.zapDmg > 0) {
                    currentCog.lureType = 'none';
                } else if(combos.squirtDmg > 0) {
                    combos.squirtDmg = Math.ceil(combos.squirtDmg + (combos.squirtDmg * (cog1.lureType === 'prestieged' ? 0.65 : 0.5)));
                    currentCog.lureType = 'none';
                } else if(combos.throwDmg > 0) {
                    combos.throwDmg = Math.ceil(combos.throwDmg + (combos.throwDmg * (cog1.lureType === 'prestieged' ? 0.65 : 0.5)));
                    currentCog.lureType = 'none';
                } else if(combos.dropDmg > 0) {
                    combos.dropDmg = 0;
                }
                //combos[combo] = combos[combo] + (combos[combo] * (cog1.lureType === 'prestieged' ? 0.65 : 0.5));
                currentCog.lureType = 'none';
            }

            currentCog.totalDamage += combos.trapDmg + combos.squirtDmg + combos.throwDmg + combos.dropDmg;
            currentCog.setCombos = combos;
            document.querySelector("#totalDmg" + currentCog.id).innerHTML = currentCog.totalDamage;
        })
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
        var allDmg = [];
    
        const checkGags = new Promise((res, rej) => {
                for(gag in gagArray) {
                    switch(gagArray[gag].gagType) {
                        case('trap'):
                            if(gagArray[gag].gagDamage == 0) break;
                            trapDmg.push(gagArray[gag].gagDamage);
                            break;
                        case('sound'):
                            if(gagArray[gag].gagDamage == 0) break;
                            soundDmg.push(gagArray[gag].gagDamage);
                            break;
                        case('squirt'):
                            if(gagArray[gag].gagDamage == 0) break;
                            squirtDmg.push(gagArray[gag].gagDamage);
                            break;
                        case('zap'):
                            if(gagArray[gag].gagDamage == 0) break;
                            zapDmg.push(gagArray[gag].gagDamage);
                            zapCogs.push(currentCog);
                            zapPres.push(gagArray[gag].isPres);
                            break;
                        case('throw'):
                            if(gagArray[gag].gagDamage == 0) break;
                            throwDmg.push(gagArray[gag].gagDamage);
                            break;
                        case('drop'):
                            if(gagArray[gag].gagDamage == 0) break;
                            dropDmg.push(gagArray[gag].gagDamage);
                            dropsIfCombo.push(gagArray[gag].isPres == true ? 0.15 : 0.1);
                            break;
                    }
                }
            res();
        });
    
        function calculateSound() {
            var totalSoundDmg = 0;

            totalSoundDmg = soundDmg.length > 1 ? Math.ceil(soundDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2) : soundDmg.length == 0 ? 0 : soundDmg[0];

            for(cog in allCogs) {
                if(allCogs[cog].sounded) return;
                allCogs[cog].totalDamage += totalSoundDmg;
                allCogs[cog].combos.push(['soundDmg', totalSoundDmg]);
                allCogs[cog].sounded = true;
            }

            //return totalSoundDmg;
        }
    
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
        // New zap calculation function thing
        /*async function calculateZapDamage(zapPosition) {
            if(zapDmg.length == 0 || zapDmg.reduce((r,c) => r + parseFloat(c), 0) == 0) return;
        }*/

        // Old zap calculation function thing! Will get removed from the code entirely when the new zap calculation function thing is done
        async function calculateZapDamageOld(cogArray, toonArray) {
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
                                // This code is leaving a mental scar in me, screw zapping
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
            // the array era is over for you
            // I am currently running on pure anger and 40mg of Latuda
            allDmg = {
                trapDmg: 0,
                squirtDmg: 0,
                throwDmg: 0,
                dropDmg: 0
            }
    
            trapDmg.length > 1 ? allDmg.trapDmg = 0 : trapDmg.length == 0 ? allDmg.trapDmg = 0 : allDmg.trapDmg = trapDmg[0];
            //soundDmg.length > 1 ? allDmg.soundDmg = Math.ceil(soundDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2) : soundDmg.length == 0 ? allDmg.soundDmg = 0 : allDmg.soundDmg = soundDmg[0]
            calculateSound();
            squirtDmg.length > 1 ? allDmg.squirtDmg = Math.ceil(squirtDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2) : squirtDmg.length == 0 ? allDmg.squirtDmg = 0 : allDmg.squirtDmg = squirtDmg[0]
            //zapDmg.length > 0 ? calculateZapDamage(cogArray, toonArray) : 0;
            throwDmg.length > 1 ? allDmg.throwDmg = throwDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2 : throwDmg.length == 0 ? allDmg.throwDmg = 0 : allDmg.throwDmg = throwDmg[0]
            dropDmg.length > 1 ?
                allDmg.dropDmg = calculateDrop()
            : dropDmg.length == 0 ? allDmg.dropDmg = 0 : allDmg.dropDmg = dropDmg[0];
    
            return allDmg;
        })
    }
}

console.log('App ready.');