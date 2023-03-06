let currentExerciseNum = 0;
let calculateBtnSpawned = false;
let canvasNum = 0;
let currentIndex;
const userId = document.getElementById('userId').value;


//maxRepWMK = max rep with max kg

/*const currentExercise = {
    groupName: 'Peito',
    
    exercisesAllData: [
        {
            day: '02/01',
            exercises: [{
                exerciseName: 'Supino reto',
                reps: [12, 12, 12, 12],
                kgs: [40, 40, 40, 40]
            }, {
                exerciseName: 'Fly Inclinado',
                reps: [4, 4, 4, 4],
                kgs: [30, 30, 30, 30]
            }, {
                exerciseName: 'supino declinado Declinado',
                reps: [9, 9, 9, 9],
                kgs: [45, 45, 45, 45]
            }]
        },
        {
            day: '06/01',
            exercises: [{
                exerciseName: 'Supino reto',
                reps: [5, 5, 5, 5],
                kgs: [45, 45, 45, 45]
            }, {
                exerciseName: 'Fly Inclinado',
                reps: [8, 8, 8, 8],
                kgs: [50, 50, 50, 50]
            }, {
                exerciseName: 'supino declinado Declinado',
                reps: [10, 10, 10, 10],
                kgs: [60, 60, 60, 60]
            }]
        },
        {
            day: '09/01',
            exercises: [{
                exerciseName: 'Supino reto',
                reps: [12, 12, 12, 12],
                kgs: [50, 50, 50, 50]
            }, {
                exerciseName: 'Fly Inclinado',
                reps: [10, 10, 10, 10],
                kgs: [55, 55, 55, 55]
            }, {
                exerciseName: 'supino declinado Declinado',
                reps: [8, 8, 8, 8],
                kgs: [60, 60, 60, 60]
            }]
        }

        
        
        
    ]
}*/

/*
    {
    groupName: 'Peito',

    exercisesAllData: [
        {
            day: 'newDate()',
            exercises: []
        }

    ]
    
    }

*/



(async function getTrainLog(){
    fakeDb.forEach((element, index)=>{
        let btnGroupName = document.createElement('li')
            btnGroupName.innerHTML = element.groupName;
            btnGroupName.style.color = "rgb(108, 108, 108)"
            //<i onclick="deleteTrainingGroup()" style="font-size: 18px; color: red; display: none;" class="fa-solid fa-trash"></i>
            btnGroupName.onclick = () => { trainLog(index, 'last7days', true)}
            document.getElementById('training-list').appendChild(btnGroupName)
        let trash = document.createElement('i');
        trash.className = "fa-solid fa-trash"
        trash.style.fontSize = "18px"
        trash.style.color = "red"
        trash.style.display = "none"
        trash.classList.add('trashIcon')
        trash.onclick = ()=>{deleteTrainingGroup(index)}
        btnGroupName.insertAdjacentElement("afterend", trash);
        
    })
})()

async function getTrainLogAfter() {
    document.getElementById('training-list').innerHTML = ''
    fakeDb.forEach((element, index) => {
        let btnGroupName = document.createElement('li')
        btnGroupName.innerHTML = element.groupName;
        btnGroupName.style.color = "rgb(108, 108, 108)"
        btnGroupName.onclick = () => { trainLog(index, 'last7days', true) }
        document.getElementById('training-list').appendChild(btnGroupName)
        let trash = document.createElement('i');
        trash.className = "fa-solid fa-trash"
        trash.style.fontSize = "18px"
        trash.style.color = "red"
        trash.style.display = "none"
        trash.classList.add('trashIcon')
        trash.onclick = () => { deleteTrainingGroup(index) }
        btnGroupName.insertAdjacentElement("afterend", trash);


    })
}


function trainLog(index, time="last7days", loadedNew=false) {
    currentIndex = index

    id = "labelKgBtn"
    document.getElementById("labelKgBtn").onclick = ()=>{
        calcPoints(currentIndex, 'kg')
    }
    document.getElementById("labelRepBtn").onclick = () => {
        calcPoints(currentIndex, 'rep')

    }

    if (loadedNew) {
        document.querySelectorAll('input[name="view"]')[0].checked = false;
        document.querySelectorAll('input[name="view"]')[1].checked = false;
        document.querySelectorAll('input[name="view"]')[2].checked = true;
    }

    
    
    if(!!document.getElementById('myChart'+canvasNum)){
        document.getElementById('myChart' + canvasNum).remove()
    }
    document.getElementById('main-container').innerHTML = ''


    let canvas = document.createElement('canvas');
    canvas.id = 'myChart' + canvasNum
    canvas.height = 300;
    document.getElementById('canvasContainer').appendChild(canvas);

    const ctx = document.getElementById('myChart' + canvasNum);
    
    let inputs = document.createElement('div');
    inputs.id = "training-new-data"
    inputs.className = 'paperModal'
    //<button onclick="addExercise()">Adicionar exercício</button>
    let addExerciseBtn = document.createElement('span');
        addExerciseBtn.id = 'addExerciseBtn'
    addExerciseBtn.onclick = () => { addExercise(index) }
    addExerciseBtn.innerHTML = '<button>+</button>add exercicio';

    document.getElementById('main-container').appendChild(inputs)

    let groupName = document.createElement('input');
        groupName.id = 'currentWorkoutName'
        groupName.type= "hidden";
        groupName.value = fakeDb[index].groupName


    document.getElementById('training-new-data').appendChild(groupName)
    document.getElementById('training-new-data').appendChild(addExerciseBtn)
    if (!!document.getElementById('createButton')) {
        document.getElementById('createButton').remove()
    }



    fakeDb[index].exercisesAllData[fakeDb[index].exercisesAllData.length - 1].exercises.forEach(i => {
        ++currentExerciseNum
        let ceN = currentExerciseNum
        


        let inputContainer = document.createElement('div');
        inputContainer.className = "exercise";
        let h3exerciseName = document.createElement('h3');
        h3exerciseName.innerHTML = i.exerciseName;
        inputContainer.appendChild(h3exerciseName);
        let divRepKg = document.createElement('div');
        let kgsContainer = document.createElement('div');
        kgsContainer.className = 'kg';
        let repsContainer = document.createElement('div')
        repsContainer.className = 'rep';

        divRepKg.appendChild(repsContainer);
        divRepKg.appendChild(kgsContainer);

        i.reps.forEach(element => {
            let repInput = document.createElement('input');
            repInput.className = 'reps';
            repInput.type = 'text';
            repInput.placeholder = element;
            repInput.value = element;

            repsContainer.appendChild(repInput);
        })



        let btnPlus = document.createElement('button');
        btnPlus.onclick = () => { addSerie(ceN) }
        btnPlus.innerHTML = '+'
        

        repsContainer.appendChild(document.createElement('br'))
        repsContainer.appendChild(btnPlus)
        repsContainer.appendChild(document.createElement('br'))

        let actualElement;

        i.kgs.forEach(element => {
            let kgInput = document.createElement('input');
            kgInput.className = 'kgs';
            kgInput.type = 'text';
            kgInput.placeholder = element;
            kgInput.value = element;
            
            kgsContainer.appendChild(kgInput);
        })

        let btnSub = document.createElement('button');
        btnSub.onclick = () => { removeSerie(ceN) }
        btnSub.innerHTML = '-'

        kgsContainer.appendChild(document.createElement('br'))
        kgsContainer.appendChild(btnSub)
        kgsContainer.appendChild(document.createElement('br'))



        inputContainer.appendChild(divRepKg);
        document.getElementById('training-new-data').appendChild(inputContainer)




    })



    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...getExercisesData('day', index, time)],
            datasets: [...getExercisesData('exerciseName', index, time)]
        },
        options: {
            
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Treino de ' + fakeDb[index].groupName
                }
            }

        }
    });

    document.getElementById('chartArea').style.display = 'initial'

    if (!document.getElementById('calcBtn')) {
        let calcBtn = document.createElement('button');
        calcBtn.innerHTML = 'Finalizar treino'
        calcBtn.id = "calcBtn"
        calcBtn.classList.add('calcBtn')
        calcBtn.onclick = () => {
            calcPoints(index)
        }
        document.getElementById('main-container').appendChild(calcBtn)
        calculateBtnSpawned = true;
    }

}


function getExercisesData(categorieReturn,index, time, kgOrRep='rep') {
    
    
    let datas = []
    let repKgData = []
    let newDatas = []


    if (categorieReturn != 'day' && time == 'month') {
        newDatas.push({
            month: 'janeiro',
            datas: []
        },
            {
                month: 'fevereiro',
                datas: []
            },
            {
                month: 'março',
                datas: []
            },
            {
                month: 'abril',
                datas: []
            },
            {
                month: 'maio',
                datas: []
            },
            {
                month: 'junho',
                datas: []
            },
            {
                month: 'julho',
                datas: []
            },
            {
                month: 'agosto',
                datas: []
            },
            {
                month: 'setembro',
                datas: []
            },
            {
                month: 'outubro',
                datas: []
            },
            {
                month: 'novembro',
                datas: []
            },
            {
                month: 'dezembro',
                datas: []
            })
    }
    
        
    
        if (categorieReturn == 'day') {
            fakeDb[index].exercisesAllData.forEach(i=>{
                
                datas.push(i.day)

            })
            
            if (time == 'last7days') {
                return datas.slice(0, 7)
            } else if (time == 'week') {
                return datas.slice(0, 30)
            } else if (time == "month") {
                
                datas.forEach(i => {
                    
                    if (i.indexOf("/01") != -1) {
                        newDatas.push("janeiro");
                    } else if (i.indexOf("/02") != -1) {
                        newDatas.push("fevereiro");
                    } else if (i.indexOf("/03") != -1) {
                        newDatas.push("março");
                    } else if (i.indexOf("/04") != -1) {
                        newDatas.push("abril");
                    } else if (i.indexOf("/05") != -1) {
                        newDatas.push("maio");
                    } else if (i.indexOf("/06") != -1) {
                        newDatas.push("junho");
                    } else if (i.indexOf("/07") != -1) {
                        newDatas.push("julho");
                    } else if (i.indexOf("/08") != -1) {
                        newDatas.push("agosto");
                    } else if (i.indexOf("/09") != -1) {
                        newDatas.push("setembro");
                    } else if (i.indexOf("/10") != -1) {
                        newDatas.push("outubro");
                    } else if (i.indexOf("/11") != -1) {
                        newDatas.push("novembro");
                    } else if (i.indexOf("/12") != -1) {
                        newDatas.push("dezembro");
                    }
                    
                })
                let meses = [...new Set(newDatas)]
                console.log(meses)
                datas = meses
                return meses
            }
        } else if (categorieReturn == 'exerciseName') {
            fakeDb[index].exercisesAllData.forEach(i => {
                i.exercises.forEach(exercise => {
                    repKgData.push({ day: i.day, exerciseName: exercise.exerciseName,reps: exercise.reps, kgs: exercise.kgs})
                    
                    
                        /*label: '# Rep',
                        data: [12, (reps/14)],
                        borderWidth: 1
                        */
                });
            })
            
            

            let mergedExercises = repKgData.reduce((acc, exercise) => {
                let existingExercise = acc.find(item => item.exerciseName === exercise.exerciseName);
                if (existingExercise) {
                    existingExercise.days.push({ day: exercise.day, reps: exercise.reps, kgs: exercise.kgs });
                } else {
                    acc.push({ exerciseName: exercise.exerciseName, days: [{ day: exercise.day, reps: exercise.reps, kgs: exercise.kgs }] });
                }
                return acc;
            }, []);

            
        
            mergedExercises.forEach(item=>{
                let daysMergedKg = []
                let daysMergedRep = []
                
                
                if (time != 'month') {
                    
                
                item.days.forEach(categorie=>{
                    daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                    daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                })
                
                if (kgOrRep == 'rep') {
                    datas.push({
                        label: item.exerciseName+'# Rep',
                        data: [...daysMergedRep],
                        borderWidth: 2
                    })
                } else if (kgOrRep == 'kg'){
                    datas.push({
                        label: item.exerciseName + '# Kg',
                        data: [...daysMergedKg],
                        borderWidth: 2
                    })
                    
                }


                /*label: '# Rep',
                        data: [12, (reps/14)],
                        borderWidth: 1
                        */
            }else{

                
                
                    item.days.forEach(categorie => {
                        if (categorie.day.indexOf('/01') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex)=>{
                                if (element.month == 'janeiro') {
                                    newDatas[newDatasIndex].datas = [{kgs: [...daysMergedKg]}, {reps: [...daysMergedRep]} ]
                                }
                            });

                        } else if (categorie.day.indexOf('/02') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'fevereiro') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/03') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'março') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/04') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'abril') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/05') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'maio') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/06') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'junho') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/07') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'julho') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/08') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'agosto') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/09') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'setembro') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/10') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'outubro') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/11') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'novembro') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        } else if (categorie.day.indexOf('/12') != -1) {
                            daysMergedKg.push(categorie.kgs.reduce((total, num) => total + num, 0));
                            daysMergedRep.push(categorie.reps.reduce((total, num) => total + num, 0));
                            newDatas.forEach((element, newDatasIndex) => {
                                if (element.month == 'dezembro') {
                                    newDatas[newDatasIndex].datas = [{ kgs: [...daysMergedKg] }, { reps: [...daysMergedRep] }]
                                }
                            });
                        }

                        
                        
                       
                    })
                    const filteredArray = newDatas.filter(item => item.datas.length > 0);
                    
                    filteredArray.forEach((i, filterIndex)=>{
                        
                        filteredArray[filterIndex].datas[0].kgs = i.datas[0].kgs.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                        filteredArray[filterIndex].datas[1].reps = i.datas[1].reps.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
                        
                    })
                    
                    let monthMergedRep = []
                    let monthMergedKg = []
                    filteredArray.forEach(i=>{
                        monthMergedRep.push(i.datas[1].reps)
                        monthMergedKg.push(i.datas[0].kgs)
                    })

                    

                    datas.push({
                        label: item.exerciseName + '# Rep',
                        data: [...monthMergedRep],
                        borderWidth: 2
                    })

                    datas.push({
                        label: item.exerciseName + '# Kg',
                        data: [...monthMergedKg],
                        borderWidth: 2
                    })
            }
            })

        }


    if (time == 'last7days') {
        return datas.slice(0, 7)
    } else if (time == 'week'){
        return datas.slice(0, 30)
    } else if (time == "month"){
        console.log('datas')
        console.log(datas)
        return datas
    }

    
    
}






async function calcPoints(index, kgOrRep="rep"){
    
    

    if (!!document.getElementById('myChart' + canvasNum)) {
        document.getElementById('myChart' + canvasNum).remove()
    }

    let canvas = document.createElement('canvas');
    canvas.id = 'myChart' + canvasNum
    canvas.height = 300;
    document.getElementById('canvasContainer').appendChild(canvas);

    const ctx = document.getElementById('myChart' + canvasNum);
    


    let exercisesDataAdd = []
    
    //

    for (let element = 0; element < document.getElementsByClassName('exercise').length; element++) {
        const inputContainer = document.getElementsByClassName('exercise')[element];

        let exerciseName = inputContainer.children[0].innerHTML;
        let inputsRep = inputContainer.children[1].children[0];
        let inputsKg = inputContainer.children[1].children[1];

        
        
        

        let exerciseData = {
            exerciseName,
            reps: [],
            kgs: []
        }
        

        for (let forI = 0; forI < (inputsRep.children.length -3); forI++) {
            const element = inputsRep.children[forI];
            
            exerciseData.reps.push(parseInt(element.value));
            
            
            
        }

        console.log(inputsKg)
        for (let forI = 0; forI < (inputsKg.children.length - 3); forI++) {
            const element = inputsKg.children[forI];
            
            exerciseData.kgs.push(parseInt(element.value));

        }

        exercisesDataAdd.push(exerciseData)
        
        
    }

    let data = new Date();
    let dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });

    console.log(dataFormatada)
    if (dataFormatada == fakeDb[index].exercisesAllData[fakeDb[index].exercisesAllData.length - 1].day) {
        fakeDb[index].exercisesAllData[fakeDb[index].exercisesAllData.length - 1].exercises = exercisesDataAdd
    }else{
        
        fakeDb[index].exercisesAllData.push({ day: dataFormatada, exercises: exercisesDataAdd })
    }


    
    
    console.log(fakeDb[index].exercisesAllData[fakeDb[index].exercisesAllData.length - 1])
    console.log(fakeDb[index].exercisesAllData)

    try {
document.cookie.split(';').forEach(async cookie => {
        authToken = cookie.split('=');
        if (authToken[0] == ' authToken' || authToken[0] == 'authToken') {
        await axios.put('https://server.mswareg.com/trainLog',{
            userId,
            trainLog: JSON.stringify(fakeDb)
        }, {
            headers: {
                'authorization': `Bearer ${authToken[1]}`
                }
            })
}
    })
        console.log(JSON.stringify(fakeDb))
    } catch (error) {
        console.log(error)
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [...getExercisesData('day', index, 'last7days')],
            datasets: [...getExercisesData('exerciseName', index, 'last7days', kgOrRep)]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Treino de ' + fakeDb[index].groupName
                }
            }

        }
    });


    document.getElementById('chartArea').style.display = 'initial'

}

function addSerie(exercise){
    //<input id="rep4" type="text" placeholder="rep"><br>
    //<input id="kg4" type="text" placeholder="kg">

    var newRep = document.createElement('input');
        newRep.placeholder = 'Rep'
        newRep.classList.add('reps')
    var newKg = document.createElement('input');
        newKg.placeholder = 'Kg'
        newKg.classList.add('kgs');

    let insertBeforeElementRep = document.getElementsByClassName('rep')[exercise - 1].children[document.getElementsByClassName('rep')[exercise - 1].children.length - 3]
    let insertBeforeElementKg = document.getElementsByClassName('kg')[exercise - 1].children[document.getElementsByClassName('kg')[exercise - 1].children.length - 3]

    document.getElementsByClassName('rep')[exercise-1].insertBefore(newRep, insertBeforeElementRep)
    document.getElementsByClassName('kg')[exercise-1].insertBefore(newKg, insertBeforeElementKg)

    
    //document.getElementsByClassName('reps')[exercise*4].insertAdjacentElement('afterend', newRep);
    //document.getElementsByClassName('kgs')[exercise*4].insertAdjacentElement('afterend', newKg);
}

function removeSerie(exercise) {
    
    document.getElementsByClassName('rep')[exercise-1].removeChild(document.getElementsByClassName('rep')[exercise-1].children[document.getElementsByClassName('rep')[exercise-1].children.length - 4])
    document.getElementsByClassName('kg')[exercise-1].removeChild(document.getElementsByClassName('kg')[exercise-1].children[document.getElementsByClassName('kg')[exercise-1].children.length - 4])
}

function createTrain(){

    let data = new Date();
    let dataFormatada = data.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });


    fakeDb.push({

            groupName: document.getElementById('newTrain').value,

            exercisesAllData: [
                {
                    day: dataFormatada,
                    exercises: []
                }

            ]
    })

    getTrainLogAfter()

    document.getElementById('newTrainLi').style.display = 'none'

}

function addExercise(index){
    
    
    if (!calculateBtnSpawned) {
        let calcBtn = document.createElement('button');
            calcBtn.classList.add('calcBtn')
            calcBtn.innerHTML = 'Finalizar treino.'
            calcBtn.onclick = ()=>{
                calcPoints()
            }
        document.getElementById('main-container').appendChild(calcBtn)
        calculateBtnSpawned = true;
    }

    ++currentExerciseNum
    //<div class="exercise" id="exerciseId"></div>
    const inputContainer = document.createElement('div');
          inputContainer.classList.add('exercise');
          
    const inputHTML = `
                
                <input class="input-exercise-name" id="input-exercise-nameId" type="text" placeholder="Digite o nome do exercício">
                <button id="exerciseNameBtn" onclick="insertExerciseName(${index})">Ok</button>
                <div>
                    <div class="rep">
                        <input class="reps" type="text" placeholder="rep">
                        <input class="reps" type="text" placeholder="rep">
                        <input class="reps" type="text" placeholder="rep">
                        <input class="reps" type="text" placeholder="rep"><br>
                        <button onclick="addSerie(${currentExerciseNum})">+</button><br>
                    </div>
                    <div class="kg">
                        <input class="kgs" type="text" placeholder="kg">
                        <input class="kgs" type="text" placeholder="kg">
                        <input class="kgs" type="text" placeholder="kg">
                        <input class="kgs" type="text" placeholder="kg"><br>
                        <button onclick="removeSerie(${currentExerciseNum})">-</button><br>
                    </div>
                </div>
    `
    inputContainer.innerHTML = inputHTML;
    document.getElementById('training-new-data').appendChild(inputContainer);
    document.getElementById('addExerciseBtn').style.display = 'none'

}

function insertExerciseName(index){
    const ExerciseName = document.createElement("h3");
    ExerciseName.textContent = document.getElementById('input-exercise-nameId').value;

    const parent = document.getElementsByClassName("exercise")[fakeDb[index].exercisesAllData[fakeDb[index].exercisesAllData.length -1].exercises.length];
    
    console.log(fakeDb)
    console.log(currentExerciseNum)
    console.log(currentExerciseNum)
    parent.prepend(ExerciseName);
    document.getElementById('exerciseNameBtn').remove()
    
    fakeDb.forEach((e, fIndex) => {
        if (e.groupName == document.getElementById('currentWorkoutName').value) {

            for (let forI = 0; forI < fakeDb[fIndex].exercisesAllData.length; forI++) {
                const element = fakeDb[fIndex].exercisesAllData[forI];
                element.exercises.push({
                    exerciseName: document.getElementById('input-exercise-nameId').value,
                    reps: [],
                    kgs: []
                })
                
            }

        }
    });

    
    document.getElementById('input-exercise-nameId').remove()

    document.getElementById('addExerciseBtn').style.display = 'flex'

    

}

function showAddTrainInput(){
    document.getElementById('newTrainLi').style.display = 'flex'
}

function showTrash(){
    if (document.getElementsByClassName('trashIcon')[0].style.display != 'initial') {
        for (let i = 0; i < document.getElementsByClassName('trashIcon').length; i++) {
            document.getElementsByClassName('trashIcon')[i].style.display = 'initial';
            
        }
    }else{
        for (let i = 0; i < document.getElementsByClassName('trashIcon').length; i++) {
            document.getElementsByClassName('trashIcon')[i].style.display = 'none';

        }
    }
}

function deleteTrainingGroup(index){
    fakeDb.splice(index, 1);
    getTrainLogAfter()
}


const viewOptions = document.querySelectorAll('input[name="view"]');


viewOptions.forEach(option => {
    option.addEventListener('change', (event) => {
        viewOptions.forEach(otherOption => {
            if (otherOption !== event.target) {
                
                trainLog(currentIndex, event.target.value)
                otherOption.checked = false;
            }
        });
    });
});


function downloadHistory(){
    const meuJson = JSON.stringify(fakeDb);
    const blob = new Blob([meuJson], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    
    const link = document.getElementById('download-history')
    link.href = url;
    link.download = "historicoDeTreino.txt";
    // remove o link da página
}

const input = document.getElementById('uploadHistory');

input.addEventListener('change', () => {
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
        let conteudoDoArquivo = `${event.target.result}`;
        console.log(conteudoDoArquivo)
        fakeDb = JSON.parse(conteudoDoArquivo);
        console.log(fakeDb)
        getTrainLogAfter()
    };
    reader.readAsText(file);
});





