/*************** 
 * Prueba Test *
 ***************/

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function inverted(bools) {
   return bools.map(function(bool) {return !bool});
}

function randomNumber(min, max) {  
    return Math.random() * (max - min) + min; 
}  

function time_polygon_1_2(num_pruebas) {
    /*
    Recibe: cantidad de pruebas a ejecutar
    Devuelve: tiempo del poligono 1 y 2
    */

    //Se aleatorizo un vector boleano para eleccion de S y L en POLYGON1
    var random_SL_1;
    random_SL_1 = Array(Number.parseInt((num_pruebas / 2))).fill(false);
    random_SL_1 = random_SL_1.concat(Array(Number.parseInt((num_pruebas / 2))).fill(true));
    shuffle(random_SL_1);
  
  //Se invierte vector para POLYGON2
    var random_SL_2 = inverted(random_SL_1);

    //Se obtiene una lista de valores aleatorios entre .4 y .7
    var S=[];
    for (var i = num_pruebas - 1; i >= 0; i--) {
      S.push(parseFloat(randomNumber(.4,.7).toFixed(4)));
    }

    //Lista de valores "L" es 2 veces "S"
    var L = S.map(function(x) { return x * 2; });

    //console.log("S",S,"\nL",L)
    //Asigna los valores segun True y False a POLYGON1 y POLYGON2
    for (var i = 0, _pj_a = num_pruebas; (i < _pj_a); i += 1) {
      if ((random_SL_1[i] === true)) {
          random_SL_1[i] = S[i];
      } else {
          random_SL_1[i] = L[i];
      }
      if ((random_SL_2[i] === true)) {
          random_SL_2[i] = S[i];
      } else {
          random_SL_2[i] = L[i];
      }
}


    return [random_SL_1,random_SL_2];
}


//console.log("\n\n P1",p1,"\nP2",p2);


function remove(array, element) {
  const index = array.indexOf(element);
  array.splice(index, 1);
}

function calculate_time_polygon_3(p1,p2) {
    /*
    Recibe: lista de tiempo de poligono 1 y poligono 2.
    Devuelve: valores para duracion de poligono 3.
    */

    //Numero de pruebas (repeticiones)
    var num_pruebas = p1.length;

    //Funciones
    var f_0 = (s, l) => {
        return s;
    };
    var f_1 = (s, l) => {
        return ((s + Math.pow((s * l), 0.5)) / 2);
    };
    var f_2 = (s, l) => {
        return Math.pow((s * l), 0.5);
    };
    var f_3 = (s, l) => {
        return ((l + Math.pow((s * l), 0.5)) / 2);
    };
    var f_4 = (s, l) => {
        return l;
    };

    var funciones = [f_0, f_1, f_2, f_3, f_4];

    //Eleccion de funciones
    var funciones_disponibles = [0, 1, 2, 3, 4];

    //Para recuento de aplicaciones de funciones
    var conteo_funciones = [0, 0, 0, 0, 0];

    //Limite de veces que se puede aplicar una funcion
    var limite_pruebas = Number.parseInt(num_pruebas / 5);

    var resultados = [];
    var funciones_elegidas = [];

    //console.log(limite_pruebas)


    var IN = function(ls, val){
        return ls.indexOf(val) != -1;
    };

    for (var i = num_pruebas - 1; i >= 0; i--) {
        var prueba = i;
        //console.log(i);

        //Si se ha alcanzado el limite de pruebas en una funcion
        if (IN(conteo_funciones,limite_pruebas)) {
            //Se busca la funcion que llego al limite
            var borrar = conteo_funciones.indexOf(limite_pruebas);
            //En el conteo se cambia por una X (finalizado) para que no se considere en proximos ciclos
            conteo_funciones[borrar] = 'X';
            //Se borra de las funciones disponibles el elemento que llego al limite de pruebas
            //delete funciones_disponibles[borrar];
            remove(funciones_disponibles,borrar);
        }

        //Elije aleatoriamente una funcion a aplicar de las funciones disponibles
        //console.log("\nConteo de funciones",conteo_funciones)
        //console.log("Funciones_disponibles",funciones_disponibles)
        var funcion_elegida = funciones_disponibles[Math.floor(Math.random() * funciones_disponibles.length)];

        //Aumenta el conteo en la funcion elegida
        conteo_funciones[funcion_elegida] += 1;

        //Se evalua el valor largo o corto para los timepos de poligonos (p1 y p2) de entrada
        if ((p1[prueba] > p2[prueba])) {
            var L = p1[prueba];
            var S = p2[prueba];

        }else {
            var S = p1[prueba];
            var L = p2[prueba];
        }

        //console.log("Funcion elegida",funcion_elegida)
        //console.log("S",S,"L",L)
        funciones_elegidas.push(funcion_elegida);
        resultados.push(parseFloat(funciones[funcion_elegida](S,L)).toFixed(4));
    }

    return [resultados,funciones_elegidas];
}


var i = 0;
var p1=[];
var p2=[];
var p3=[];
var func=[];

for (var j = 3 - 1; j >= 0; j--) {
    var num_pruebas = 40;
    var [p1_1,p2_1]=time_polygon_1_2(num_pruebas);
    var [p3_1,func_1] = calculate_time_polygon_3(p1_1,p2_1);
    p1 = p1.concat(p1_1);
    p2 = p2.concat(p2_1);
    p3 = p3.concat(p3_1);
    func = func.concat(func_1);
}
p3[i] = parseFloat(p3[i]);
console.log("P1",p1,"\nP2",p2,"\nP3",p3);


import { PsychoJS } from './lib/core-2020.1.js';
import * as core from './lib/core-2020.1.js';
import { TrialHandler } from './lib/data-2020.1.js';
import { Scheduler } from './lib/util-2020.1.js';
import * as util from './lib/util-2020.1.js';
import * as visual from './lib/visual-2020.1.js';
import * as sound from './lib/sound-2020.1.js';

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([(.4),(.4),(.4)]), opacity: 90,
  units: 'height',
  waitBlanking: true
});

// store info about the experiment session:
let expName = 'prueba';  // from the Builder filename that created this script
let expInfo = {'participant': '', 'session': '001'};

// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(InstruccRoutineBegin());
flowScheduler.add(InstruccRoutineEachFrame());
flowScheduler.add(InstruccRoutineEnd());
const ensayosLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(ensayosLoopBegin, ensayosLoopScheduler);
flowScheduler.add(ensayosLoopScheduler);
flowScheduler.add(ensayosLoopEnd);
flowScheduler.add(DespedidaRoutineBegin());
flowScheduler.add(DespedidaRoutineEachFrame());
flowScheduler.add(DespedidaRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  });


var frameDur;
function updateInfo() {
  
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  //expInfo['expName'] = expName;
  //expInfo['psychopyVersion'] = '2020.1.2';
  expInfo['OS'] = window.navigator.platform;

  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  return Scheduler.Event.NEXT;
}


var InstruccClock;
var text;
var key_resp;
var PrimeraSecClock;
var polygon;
var polygon_2;
var polygon_3;
var IncrementoClock;
var PreguntaClock;
var text_2;
var key_resp_2;
var DespedidaClock;
var text_3;
var key_resp_3;
var globalClock;
var routineTimer;
function experimentInit() {
  // Initialize components for Routine "Instrucc"
  InstruccClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
text: 'Bienvenido al experimento. A continuación, se presentará una secuencia de 3 figuras geométricas. Tu tarea consiste \nen señalar si la duración de la tercer figura fue similar a la primera o a la segunda.\nPresiona la tecla "espacio" para comenzar.',    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('black'),  opacity: 1,
    depth: 0.0 
  });

  key_resp = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "PrimeraSec"
  PrimeraSecClock = new util.Clock();
  polygon = new visual.Rect ({
    win: psychoJS.window, name: 'polygon', 
    width: [0.2, 0.2][0], height: [0.2, 0.2][1],
    ori: 0, pos: [0, 0],
    lineWidth: 1, lineColor: new util.Color([(- 1), (- 1), (- 1)]),
    fillColor: new util.Color([(- 1), (- 1), (- 1)]),
    opacity: 1, depth: 0, interpolate: true,
  });
  
  polygon_2 = new visual.Rect ({
    win: psychoJS.window, name: 'polygon_2', 
    width: [0.2, 0.2][0], height: [0.2, 0.2][1],
    ori: 0, pos: [0, 0],
    lineWidth: 1, lineColor: new util.Color([(- 1), (- 1), (- 1)]),
    fillColor: new util.Color([(- 1), (- 1), (- 1)]),
    opacity: 1, depth: -1, interpolate: true,
  });
  
  polygon_3 = new visual.Polygon ({
    win: psychoJS.window, name: 'polygon_3', 
    edges: 10000, size:[0.2, 0.2],
    ori: 0, pos: [0, 0],
    lineWidth: 1, lineColor: new util.Color([(- 1), (- 1), (- 1)]),
    fillColor: new util.Color([(- 1), (- 1), (- 1)]),
    opacity: 1, depth: -2, interpolate: true,
  });
  
  // Initialize components for Routine "Incremento"
  IncrementoClock = new util.Clock();
  // Initialize components for Routine "Pregunta"
  PreguntaClock = new util.Clock();
  text_2 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_2',
    text: '¿La duración de la tercera figura fue más parecida a la primera o a la segunda?\nPresiona "S" para la primera o "L" para la segunda',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('black'),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp_2 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Initialize components for Routine "Despedida"
  DespedidaClock = new util.Clock();
  text_3 = new visual.TextStim({
    win: psychoJS.window,
    name: 'text_3',
    text: 'Gracias por participar.\nPor favor informa al experimentador que has terminado y presiona la tecla "espacio" para terminar.\n',
    font: 'Arial',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0,
    color: new util.Color('black'),  opacity: 1,
    depth: 0.0 
  });
  
  key_resp_3 = new core.Keyboard({psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true});
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var _key_resp_allKeys;
var InstruccComponents;
function InstruccRoutineBegin(trials) {
  return function () {
    //------Prepare to start Routine 'Instrucc'-------
    t = 0;
    InstruccClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    key_resp.keys = undefined;
    key_resp.rt = undefined;
    _key_resp_allKeys = [];
    // keep track of which components have finished
    InstruccComponents = [];
    InstruccComponents.push(text);
    InstruccComponents.push(key_resp);
    
    for (const thisComponent of InstruccComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    
    return Scheduler.Event.NEXT;
  };
}


var continueRoutine;
function InstruccRoutineEachFrame(trials) {
  return function () {
    //------Loop for each frame of Routine 'Instrucc'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = InstruccClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0.0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      document.body.style.cursor='none';
      text.setAutoDraw(true);
    }

    
    // *key_resp* updates
    if (t >= 0.0 && key_resp.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp.tStart = t;  // (not accounting for frame time here)
      key_resp.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp.clearEvents(); });
    }

    if (key_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp.getKeys({keyList: ['y', 'n', 'left', 'right', 'space'], waitRelease: false});
      _key_resp_allKeys = _key_resp_allKeys.concat(theseKeys);
      if (_key_resp_allKeys.length > 0) {
        key_resp.keys = _key_resp_allKeys[_key_resp_allKeys.length - 1].name;  // just the last key pressed
        key_resp.rt = _key_resp_allKeys[_key_resp_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of InstruccComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function InstruccRoutineEnd(trials) {
  return function () {
    //------Ending Routine 'Instrucc'-------
    for (const thisComponent of InstruccComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    //psychoJS.experiment.addData('key_resp.keys', key_resp.keys);
    if (typeof key_resp.keys !== 'undefined') {  // we had a response
        //psychoJS.experiment.addData('key_resp.rt', key_resp.rt);
        routineTimer.reset();
        }
    
    key_resp.stop();
    // the Routine "Instrucc" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var ensayos;
var currentLoop;
function ensayosLoopBegin(thisScheduler) {
  // set up handler to look after randomisation of conditions etc
  ensayos = new TrialHandler({
    psychoJS: psychoJS,
    nReps: 120, method: TrialHandler.Method.RANDOM,
    extraInfo: expInfo, originPath: undefined,
    trialList: undefined,
    seed: undefined, name: 'ensayos'
  });
  psychoJS.experiment.addLoop(ensayos); // add the loop to the experiment
  currentLoop = ensayos;  // we're now the current loop

  // Schedule all the trials in the trialList:
  for (const thisEnsayo of ensayos) {
    const snapshot = ensayos.getSnapshot();
    thisScheduler.add(importConditions(snapshot));
    thisScheduler.add(PrimeraSecRoutineBegin(snapshot));
    thisScheduler.add(PrimeraSecRoutineEachFrame(snapshot));
    thisScheduler.add(PrimeraSecRoutineEnd(snapshot));
    thisScheduler.add(IncrementoRoutineBegin(snapshot));
    thisScheduler.add(IncrementoRoutineEachFrame(snapshot));
    thisScheduler.add(IncrementoRoutineEnd(snapshot));
    thisScheduler.add(PreguntaRoutineBegin(snapshot));
    thisScheduler.add(PreguntaRoutineEachFrame(snapshot));
    thisScheduler.add(PreguntaRoutineEnd(snapshot));
    thisScheduler.add(endLoopIteration(thisScheduler, snapshot));
  }

  return Scheduler.Event.NEXT;
}


function ensayosLoopEnd() {
  psychoJS.experiment.removeLoop(ensayos);

  return Scheduler.Event.NEXT;
}


var PrimeraSecComponents;
function PrimeraSecRoutineBegin(trials) {
  return function () {
    //------Prepare to start Routine 'PrimeraSec'-------
    t = 0;
    PrimeraSecClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    // keep track of which components have finished
    PrimeraSecComponents = [];
    PrimeraSecComponents.push(polygon);
    PrimeraSecComponents.push(polygon_2);
    PrimeraSecComponents.push(polygon_3);

    for (const thisComponent of PrimeraSecComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    
    return Scheduler.Event.NEXT;
  };
}


var frameRemains;
function PrimeraSecRoutineEachFrame(trials) {
  return function () {
    //------Loop for each frame of Routine 'PrimeraSec'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = PrimeraSecClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame

    // *polygon* updates
    if (t >= 1.0 && polygon.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon.tStart = t;  // (not accounting for frame time here)
      polygon.frameNStart = frameN;  // exact frame index
      document.body.style.cursor='none';
      polygon.setAutoDraw(true);
    }

    frameRemains = 1.0 + p1[i] - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon.setAutoDraw(false);
    }
    
    // *polygon_2* updates
    if (t >= (p1[i] + 2) && polygon_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_2.tStart = t;  // (not accounting for frame time here)
      polygon_2.frameNStart = frameN;  // exact frame index
      document.body.style.cursor='none';
      polygon_2.setAutoDraw(true);
    }

    frameRemains = (p1[i] + 2) + p2[i] - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_2.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_2.setAutoDraw(false);
      document.body.style.cursor='none';
    }
    
    // *polygon_3* updates
    if (t >= (((p1[i] + 2) + p2[i]) + 1) && polygon_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      polygon_3.tStart = t;  // (not accounting for frame time here)
      polygon_3.frameNStart = frameN;  // exact frame index
      document.body.style.cursor='none';
      polygon_3.setAutoDraw(true);
    }

    frameRemains = (((p1[i] + 2) + p2[i]) + 1) + p3[i] - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (polygon_3.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      polygon_3.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of PrimeraSecComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
     expInfo['Funcion utilizada'] = func[i];
      expInfo['P1'] = p1[i];
      expInfo['P2'] = p2[i];
      expInfo['P3'] = p3[i];
      if (p1[i] > p2[i]){

        expInfo['Patron'] = 1
      }
      else{
        expInfo['Patron'] = 0
      }
  
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function PrimeraSecRoutineEnd(trials) {
  return function () {
    //------Ending Routine 'PrimeraSec'-------
    for (const thisComponent of PrimeraSecComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "PrimeraSec" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var IncrementoComponents;
function IncrementoRoutineBegin(trials) {
  return function () {
    //------Prepare to start Routine 'Incremento'-------
    t = 0;
    IncrementoClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    // keep track of which components have finished
    IncrementoComponents = [];
    
    for (const thisComponent of IncrementoComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    
    return Scheduler.Event.NEXT;
  };
}


function IncrementoRoutineEachFrame(trials) {
  return function () {
    //------Loop for each frame of Routine 'Incremento'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = IncrementoClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    i += 1;
    p3[i] = parseFloat(p3[i]);
    //console.log("P1",p1[i],"\nP2",p2[i],"\nP3",p3[i]);
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of IncrementoComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function IncrementoRoutineEnd(trials) {
  return function () {
    //------Ending Routine 'Incremento'-------
    for (const thisComponent of IncrementoComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // the Routine "Incremento" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_2_allKeys;
var PreguntaComponents;
function PreguntaRoutineBegin(trials) {
  return function () {
    //------Prepare to start Routine 'Pregunta'-------
    t = 0;
    PreguntaClock.reset(); // clock
    frameN = 1;
    // update component parameters for each repeat
    key_resp_2.keys = undefined;
    key_resp_2.rt = undefined;
    _key_resp_2_allKeys = [];
    // keep track of which components have finished
    PreguntaComponents = [];
    PreguntaComponents.push(text_2);
    PreguntaComponents.push(key_resp_2);
    
    for (const thisComponent of PreguntaComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    
    return Scheduler.Event.NEXT;
  };
}


function PreguntaRoutineEachFrame(trials) {
  return function () {
    //------Loop for each frame of Routine 'Pregunta'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = PreguntaClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_2* updates
    if (t >= 1.0 && text_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_2.tStart = t;  // (not accounting for frame time here)
      text_2.frameNStart = frameN;  // exact frame index
      document.body.style.cursor='none';
      text_2.setAutoDraw(true);
    }

    
    // *key_resp_2* updates
    if (t >= 1.0 && key_resp_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_2.tStart = t;  // (not accounting for frame time here)
      key_resp_2.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_2.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_2.clearEvents(); });
    }

    if (key_resp_2.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_2.getKeys({keyList: ['s', 'l'], waitRelease: false});
      _key_resp_2_allKeys = _key_resp_2_allKeys.concat(theseKeys);
      if (_key_resp_2_allKeys.length > 0) {
        key_resp_2.keys = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].name;  // just the last key pressed
        key_resp_2.rt = _key_resp_2_allKeys[_key_resp_2_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of PreguntaComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function PreguntaRoutineEnd(trials) {
  return function () {
    //------Ending Routine 'Pregunta'-------
    for (const thisComponent of PreguntaComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    

    if (key_resp_2.keys == 'l'){

        key_resp_2.keys = 1;
      }
    else{
        key_resp_2.keys = 0;
      }

    psychoJS.experiment.addData('User_input', key_resp_2.keys);
    if (typeof key_resp_2.keys !== 'undefined') {  // we had a response
        psychoJS.experiment.addData('key_resp_2.rt', key_resp_2.rt);
        routineTimer.reset();
        }
    
    key_resp_2.stop();
    // the Routine "Pregunta" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
  };
}


var _key_resp_3_allKeys;
var DespedidaComponents;
function DespedidaRoutineBegin(trials) {
  return function () {
    //------Prepare to start Routine 'Despedida'-------
    t = 0;
    DespedidaClock.reset(); // clock
    frameN = -1;
    // update component parameters for each repeat
    key_resp_3.keys = undefined;
    key_resp_3.rt = undefined;
    _key_resp_3_allKeys = [];
    // keep track of which components have finished
    DespedidaComponents = [];
    DespedidaComponents.push(text_3);
    DespedidaComponents.push(key_resp_3);
    
    for (const thisComponent of DespedidaComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    
    return Scheduler.Event.NEXT;
  };
}


function DespedidaRoutineEachFrame(trials) {
  return function () {
    //------Loop for each frame of Routine 'Despedida'-------
    let continueRoutine = true; // until we're told otherwise
    // get current time
    t = DespedidaClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text_3* updates
    if (t >= 0.0 && text_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text_3.tStart = t;  // (not accounting for frame time here)
      text_3.frameNStart = frameN;  // exact frame index
      
      text_3.setAutoDraw(true);
    }

    
    // *key_resp_3* updates
    if (t >= 0.0 && key_resp_3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      key_resp_3.tStart = t;  // (not accounting for frame time here)
      key_resp_3.frameNStart = frameN;  // exact frame index
      
      // keyboard checking is just starting
      psychoJS.window.callOnFlip(function() { key_resp_3.clock.reset(); });  // t=0 on next screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.start(); }); // start on screen flip
      psychoJS.window.callOnFlip(function() { key_resp_3.clearEvents(); });
    }

    if (key_resp_3.status === PsychoJS.Status.STARTED) {
      let theseKeys = key_resp_3.getKeys({keyList: ['space'], waitRelease: false});
      _key_resp_3_allKeys = _key_resp_3_allKeys.concat(theseKeys);
      if (_key_resp_3_allKeys.length > 0) {
        key_resp_3.keys = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].name;  // just the last key pressed
        key_resp_3.rt = _key_resp_3_allKeys[_key_resp_3_allKeys.length - 1].rt;
        // a response ends the routine
        continueRoutine = false;
      }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of DespedidaComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function DespedidaRoutineEnd(trials) {
  return function () {
    //------Ending Routine 'Despedida'-------
    for (const thisComponent of DespedidaComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    //psychoJS.experiment.addData('key_resp_3.keys', key_resp_3.keys);
    if (typeof key_resp_3.keys !== 'undefined') {  // we had a response
        //psychoJS.experiment.addData('key_resp_3.rt', key_resp_3.rt);
        routineTimer.reset();
        }
    
    key_resp_3.stop();
    // the Routine "Despedida" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    return Scheduler.Event.NEXT;
    //psychoJS.experiment.addData('p1', p1);
    //psychoJS.experiment.addData('p2', p2);
    //psychoJS.experiment.addData('p3', p3);
  };
}


function endLoopIteration(thisScheduler, loop) {
  // ------Prepare for next entry------
  return function () {
    if (typeof loop !== 'undefined') {
      // ------Check if user ended loop early------
      if (loop.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(loop);
        }
      thisScheduler.stop();
      } else {
        const thisTrial = loop.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(loop);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}


function importConditions(trials) {
  return function () {
    psychoJS.importAttributes(trials.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}