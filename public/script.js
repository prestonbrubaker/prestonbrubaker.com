var min_cave_alt = 290;      // Minimum distance down for cave
var cave_chance = 0.001;     // Chance of a cave seeding
var cave_iterations = 40;    // Cave-forming iterations
var cave_spread_chance = 0.05;   // Chance of a cave spreading to neighbors during iteration

// World elements 0 = air, 1 = mars soil, 2 = dark mars soil, 3 = plant, 4 = earth stone, 5 = water
elHues = ["#000000", "#770000", "#440000", "#007700", "#333333", "#000077"];

function genWorld() {
    
    
    
    // Create mars surface layer
    pAinv = new Array(pCXW)
    var alt = 250
    var altV = 0
    for (var x = 0; x < pCXW; x++){
        temp_y = new Array(pCYW);
        altV += (Math.random() - .5) * .5
        alt += altV
        altV *= .8
        if(alt < 0){
            alt = 0
        }
        for (var y = 0; y < pCYW; y++){
            r = Math.random();

            if(y < alt){
                temp_y[y] = 0;
            }
            else{
                r2 = Math.random();
                if(r2 > .2){
                    temp_y[y] = 1;
                }
                else{
                    temp_y[y] = 2;
                }
            }
        }
        pAinv[x] = temp_y
    }

    //transpose
    for(var y = 0; y < pCYW; y++){
        temp_x = new Array(pCXW);
        for(var x = 0; x < pCXW; x++){
            temp_x[x] = pAinv[x][y]
        }
        pA[y] = temp_x
    }










      //Seed some grass
      for (var y = 0; y < pCYW - 1; y++){
        for (var x = 0; x < pCXW; x++){
            if(pA[y][x] == 0 && pA[y + 1][x] == 2 && Math.random() < 0.1){
                pA[y][x] = 3
            }
        }
    }

}

for( i = 0; i < 1000; i++){
    x_check = Math.floor(Math.random() * pCXW);
    y_check = Math.floor(Math.random() * (pCYW - 1));
    if(pA[y_check][x_check] == 3){
        for(var y_it = -2; y_it <= 2; y_it++){
            for(var x_it = -2; x_it <= 2; x_it++){
                if(y_check + y_it > pCYW - 1 || y_check + y_it < 0 || x_check + x_it > pCXW - 1 || x_check + x_it < 0){
                    continue;
                }
                if(Math.random() < 1 && (pA[y_check + 1 + y_it][x_check + x_it] == 2 || pA[y_check + 1 + y_it][x_check + x_it] == 3) && pA[y_check + y_it][x_check + x_it] == 0){
                    pA[y_check + y_it][x_check + x_it] = 3;
                }
            }
        }
    }
}

genWorld()