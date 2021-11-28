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
    const zapMulti = 3.0;
    const zapMultiWeak = 2.25;
    const zapMultiWeakest = 1.5;
    const zapMultiPresWeak = 2.5;
    const zapMultiPresWeakest = 2;

    var zapDmg = [];
    var counter = 0;

    function getLureType(id) {
        return document.querySelector("#isLured" + id).checked ? "normal" : document.querySelector("#isPresLured1").checked ? "prestieged" : "none";
    }

    function getSoakedCheckbox(id) {
        return document.querySelector("#isSoaked" + id).checked;
    }

    // Cog class
    class Cog {
        constructor(id, lureType, isSoaked, totalDamage) {
            this.id = id;
            this.lureType = lureType;
            this.isSoaked = isSoaked;
            this.zapJumped = false;
            this.gagDamages = [];
            this.totalDamage = totalDamage;
            this.combos = [];
            this.sounded = false;
            this.markedForLaugh = false;
            this.mflAmount = 0;
        }

        set setCombos(combosObject) {
            this.combos = Object.entries(combosObject);
        }
    }

    // Cogs
    cog1 = new Cog(1, getLureType(1), getSoakedCheckbox(1), 0);
    cog2 = new Cog(2, getLureType(2), getSoakedCheckbox(2), 0);
    cog3 = new Cog(3, getLureType(3), getSoakedCheckbox(3), 0);
    cog4 = new Cog(4, getLureType(4), getSoakedCheckbox(4), 0);

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
            isPres: currentToon.isPres,
            originToon: currentToon.id
        });

        if(currentToon.gagType === 'lure' && currentToon.isPres && allCogs[currentToon.cogTarget].lureType === 'none') allCogs[currentToon.cogTarget].lureType = 'prestieged';
        if(currentToon.gagType === 'lure' && !currentToon.isPres && allCogs[currentToon.cogTarget].lureType === 'none') allCogs[currentToon.cogTarget].lureType = 'normal';
    }

    for(index = 0; index < 4; index++) {
        const currentCog = allCogs[index];

        findCombos(currentCog.gagDamages, currentCog).then(combos => {
            var allGagTypes = currentCog.gagDamages.map(gag => {
                var gagName = '';
                if(gag.isPres) gagName = 'pres ';
                gagName += gag.gagType;
                return gagName;
            });
    
            const currentCogZap = currentCog.gagDamages.find(gags => gags.gagType == 'zap');
    
            //if(currentCogZap) currentCog.totalDamage += currentCogZap.gagDamage * currentCog.zapMultiplier;
    
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

    async function findCombos(gagArray, currentCog) {
        var trapDmg = [];
        var soundDmg = [];
        var squirtDmg = [];
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
                            /*zapDmg.push(gagArray[gag].gagDamage);
                            zapCogs.push(currentCog);
                            zapPres.push(gagArray[gag].isPres);*/
                            zapDmg.push({zapDamage: gagArray[gag].gagDamage, cogID: currentCog.id});
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

        // Organize all the zap damages from least damage to highest damage
        function organizeZap() {
            var lowestDamage = { dmg: 999, toonID: 1 };
            var organizedZap = [];

            for(dmg in zapDmg) {
                const currentCogZap = allCogs[zapDmg[dmg].cogID - 1];
                if(zapDmg[dmg].zapDamage < lowestDamage.dmg) {
                    organizedZap.unshift(zapDmg[dmg]);
                    lowestDamage.dmg = zapDmg[dmg].zapDamage;
                    lowestDamage.toonID = currentCogZap.gagDamages.find(gags => gags.gagType == 'zap').originToon;
                } else if(zapDmg[dmg].zapDamage == lowestDamage.dmg) {
                    if(currentCogZap.gagDamages.find(gags => gags.gagType == 'zap').originToon > lowestDamage.toonID) {
                        organizedZap.unshift(zapDmg[dmg]);
                        lowestDamage.dmg = zapDmg[dmg].zapDamage;
                        lowestDamage.toonID = currentCogZap.gagDamages.find(gags => gags.gagType == 'zap').originToon;
                    } else {
                        organizedZap.push(zapDmg[dmg]);
                    }
                } else {
                    organizedZap.push(zapDmg[dmg]);
                }
            }

            return organizedZap;
        }
    
        // Zap needs its own function because of jumps and all that
        // New zap calculation function thing
        async function calculateZapDamage(zapPosition) {
            if(zapDmg.length == 0 || zapDmg.reduce((r,c) => r + parseFloat(c), 0) == 0) return;
            const zapCogsOrganized = organizeZap();
            var zapPos = zapPosition - 1;

            const getZapDmg = new Promise((resolve, reject) => {
                for(cog in zapCogsOrganized) {
                    const currentZapCog = allCogs[zapCogsOrganized[cog].cogID - 1];
                    const currentZapGag = currentZapCog.gagDamages.find(gags => gags.gagType == 'zap');
                    const currentZapDamage = currentZapGag.gagDamage;
                    var currentCogZapMultiplier = 1;
                    var currentCogZapDamage = 0;
                    var cancelZapJump = false;
                    var zapJumpCounter = 0;
                    var zapJumpMultiplier = 0;
                    var addToZapJump = false;

                    if(currentZapCog.isSoaked) {
                        currentCogZapMultiplier = 3;
                        currentCogZapDamage = currentZapDamage * currentCogZapMultiplier;
                        currentZapCog.totalDamage += Math.ceil(currentCogZapDamage);
                        zapPos = currentZapCog.id - 1;
                        
                        for(zapJumpCounter; zapJumpCounter < 2; zapJumpCounter++) {
                            console.log('soak')
                            if(cancelZapJump) return;

                            // Adding to zapjump makes it go right, subtracting makes it go left
                            addToZapJump ? zapPos++ : zapPos--;

                            if(zapPos <= 0) {
                                addToZapJump = true;
                                zapPos += 2;
                                zapJump();
                            } else if(zapPos >= 4) {
                                addToZapJump = false;
                                zapPos -= 2;
                                zapJump();
                            } else {
                                zapJump();
                            };
                        }
                    } else {
                        currentZapCog.totalDamage += zapCogsOrganized[cog].zapDamage;
                    }

                    function zapJump() {
                        var zapJumpsSkipped = 0;

                        // Calculate the multiplier based on whether or not the zap is pres and the zap jump counter
                        if(zapJumpCounter == 0) zapJumpMultiplier = currentZapGag.isPres ? 2.5 : 2.25;
                        if(zapJumpCounter == 1) zapJumpMultiplier = currentZapGag.isPres ? 2 : 1.5;

                        console.log('Zap Position: ' + zapPos);

                        function actuallyZapJump() {
                            if(allCogs[zapPos].isSoaked) {
                                if(allCogs[zapPos].zapJumped && zapJumpsSkipped < 1) {
                                    addToZapJump ? zapPos++ : zapPos--;
                                    if(zapPos > 4) return;
                                    if(zapPos < 0) addToZapJump = true;
                                    actuallyZapJump();
                                } else if(allCogs[zapPos].zapJumped && zapJumpsSkipped >= 1) {
                                    console.log('cancelling zap jump due to max skips');
                                    cancelZapJump = true;
                                } else {
                                    allCogs[zapPos].totalDamage += Math.ceil(currentZapDamage * zapJumpMultiplier);
                                    allCogs[zapPos].zapJumped = true;
                                }
                            } else {
                                console.log('cancelling zap jump due to unsoaked cog');
                                cancelZapJump = true;
                            }
                        }

                        actuallyZapJump();
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
            soundDmg.length > 1 ? calculateSound() : 0;
            squirtDmg.length > 1 ? allDmg.squirtDmg = Math.ceil(squirtDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2) : squirtDmg.length == 0 ? allDmg.squirtDmg = 0 : allDmg.squirtDmg = squirtDmg[0]
            //zapDmg.length > 0 ? calculateZapDamage(cogArray, toonArray) : 0;
            throwDmg.length > 1 ? allDmg.throwDmg = throwDmg.reduce((r,c) => r + parseFloat(c), 0) * 1.2 : throwDmg.length == 0 ? allDmg.throwDmg = 0 : allDmg.throwDmg = throwDmg[0]
            dropDmg.length > 1 ? allDmg.dropDmg = calculateDrop() : dropDmg.length == 0 ? allDmg.dropDmg = 0 : allDmg.dropDmg = dropDmg[0];

            counter++;

            if(counter >= 4) {
                zapDmg.length > 0 ? calculateZapDamage(currentCog.id) : 0;
            }
    
            return allDmg;
        })
    }
}

console.log('App ready.');