function main() {
    // отримуєм значення з сайту
    const carbon = parseFloat(document.getElementById("carbon").value);
    const hydrogen = parseFloat(document.getElementById("hydrogen").value);
    const oxygen = parseFloat(document.getElementById("oxygen").value);
    const nitrogen = parseFloat(document.getElementById("nitrogen").value);
    const sulfur = parseFloat(document.getElementById("sulfur").value);
    const ash = parseFloat(document.getElementById("ash").value);
    const moisture = parseFloat(document.getElementById("moisture").value);

    console.log(ash, moisture);

    // коофи
    const K_RS = 100 / (100 - moisture);
    const K_RG = 100 / (100 - moisture - ash);
    if (isNaN(K_RS) || isNaN(K_RG)) {
        console.error("Помилка NaN.");
        //напевно це треба якось показувати користувачу.
        return;
    }

    // вираховуєм сухе
    const dry_hydrogen = hydrogen * K_RS;
    const dry_carbon = carbon * K_RS;
    const dry_sulfur = sulfur * K_RS;
    const dry_nitrogen = nitrogen * K_RS;
    const dry_oxygen = oxygen * K_RS;
    const dry_ash = ash * K_RS;

    // горюче
    const comb_hydrogen = hydrogen * K_RG;
    const comb_carbon = carbon * K_RG;
    const comb_sulfur = sulfur * K_RG;
    const comb_nitrogen = nitrogen * K_RG;
    const comb_oxygen = oxygen * K_RG;

    //перевірка про всяк
    const dry_sum = dry_hydrogen + dry_carbon + dry_sulfur + dry_nitrogen + dry_oxygen + dry_ash;
    const comb_sum = comb_hydrogen + comb_carbon + comb_sulfur + comb_nitrogen + comb_oxygen;

    console.log("Сума відсотків сухої маси:", dry_sum);
    console.log("Сума відсотків горючої маси:", comb_sum);

    // lhv
    const LHV_working = ((339 * carbon) + (1030 * hydrogen) - (108.8 * (oxygen - sulfur)) - (25 * moisture)) / 1000;
    const LHV_dry = (LHV_working + 0.025*moisture) * (100 / (100 - moisture))
    const LHV_combustible = (LHV_working + 0.025*moisture) * (100 / (100 - moisture - ash))

    // дисплей
    document.getElementById("dry-mass-result").textContent = dry_sum.toFixed(2) + "%";
    document.getElementById("combustible-mass-result").textContent = comb_sum.toFixed(2) + "%";

    document.getElementById("dry-coeff-result").textContent = K_RS.toFixed(2) + "%";
    document.getElementById("combustible-coeff-result").textContent = K_RG.toFixed(2) + "%";

    document.getElementById("dry-hydrogen").textContent = "H:" + dry_hydrogen.toFixed(2) + "%\n"
    document.getElementById("dry-carbon").textContent = "C:" + dry_carbon.toFixed(2) + "%\n"
    document.getElementById("dry-sulfur").textContent = "S:" + dry_sulfur.toFixed(2) + "%\n"
    document.getElementById("dry-nitrogen").textContent = "N:" + dry_nitrogen.toFixed(2) + "%\n"
    document.getElementById("dry-oxygen").textContent = "O:" + dry_oxygen.toFixed(2) + "%\n"
    document.getElementById("dry-ash").textContent = "A:" + dry_ash.toFixed(2) + "%\n"

    document.getElementById("comb-hydrogen").textContent = "H:" + comb_hydrogen.toFixed(2) + "%\n"
    document.getElementById("comb-carbon").textContent = "C:" + comb_carbon.toFixed(2) + "%\n"
    document.getElementById("comb-sulfur").textContent = "S:" + comb_sulfur.toFixed(2) + "%\n"
    document.getElementById("comb-nitrogen").textContent = "N:" + comb_nitrogen.toFixed(2) + "%\n"
    document.getElementById("comb-oxygen").textContent = "O:" + comb_oxygen.toFixed(2) + "%\n"

    document.getElementById("lhv-working").textContent = LHV_working.toFixed(5) + " МДж/кг";
    document.getElementById("lhv-dry").textContent = LHV_dry.toFixed(5) + " МДж/кг";
    document.getElementById("lhv-combustible").textContent = LHV_combustible.toFixed(5) + " МДж/кг";
}

function main2() {
    // тесаме
    const carbon2 = parseFloat(document.getElementById("carbon-2").value);
    const hydrogen2 = parseFloat(document.getElementById("hydrogen-2").value);
    const sulfur2 = parseFloat(document.getElementById("sulfur-2").value);
    const oxygen2 = parseFloat(document.getElementById("oxygen-2").value);
    const moisture2 = parseFloat(document.getElementById("moisture2").value);
    const Q_daf = parseFloat(document.getElementById("lvh-dry-mass-oil").value);
    const ash2 = parseFloat(document.getElementById("ash2").value);
    const vanadiy2 = parseFloat(document.getElementById("vanadiy2").value);

    // нанка
    if ([carbon2, hydrogen2, sulfur2, oxygen2, moisture2, ash2].some(isNaN)) {
        console.error("нанка");
        return;
    }

    // склад
    const K_WM = (100 - moisture2 - ash2) / 100;
    const Cf = (carbon2 * K_WM).toFixed(2);
    const Hf = (hydrogen2 * K_WM).toFixed(2);
    const Sf = (sulfur2 * K_WM).toFixed(2);
    const Of = (oxygen2 * K_WM).toFixed(2);
    const Mf = (moisture2 * 0.98) .toFixed(2);
    const Vf = (vanadiy2 * 0.98).toFixed(2);
    const Af = ash2.toFixed(2);

    // нижча теплота рівень обчисл
    const LHV_working = Q_daf * ((100 - moisture2 - ash2) / 100) - 0.025 * moisture2;
    
    // дисплей
    document.getElementById("composition-working-mass").textContent =
        `Cf = ${Cf}%; Hf = ${Hf}%; Of = ${Of}%; Sf = ${Sf}%; Af = ${Af}%; Mf = ${Mf}%; V = ${Vf} мг/кг;`;
    document.getElementById("lhv-working-2").textContent = LHV_working.toFixed(2) + " МДж/кг";
}
