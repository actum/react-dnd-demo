import makeStore from './store.js';
import { Neuron, Layer, Network, Trainer, Architest } from 'synaptic';

export const store = makeStore();

function Perceptron(input, hidden, output) {
    const inputLayer = new Layer(input);
    const hiddenLayer = new Layer(hidden);
    const outputLayer = new Layer(output);

    inputLayer.project(hiddenLayer);
    hiddenLayer.project(outputLayer);

    this.set({
        input: inputLayer,
        hidden: [hiddenLayer],
        output: outputLayer
    });
}

Perceptron.prototype = new Network();
Perceptron.prototype.constructor = Perceptron;

const xorPerceptron = new Perceptron(2, 3, 1);
const trainer = new Trainer(xorPerceptron);
const trainingSet = [
    {
        input: [0,0,0,0],
        output: [0]
    },
    {
        input: [0,0,1,1],
        output: [0]
    },
    {
        input: [0,1,0,1],
        output: [0]
    },
    {
        input: [1,0,0,1],
        output: [0]
    },
    {
        input: [1,1,1,1],
        output: [1]
    },
    {
        input: [0,1,1,0],
        output: [0]
    }
]


console.log(trainer.train(trainingSet));

console.log(xorPerceptron.activate([0,0,0,0]));
console.log(xorPerceptron.activate([1,1,1,1]));
console.log(xorPerceptron.activate([0,1,1,0]));
console.log(xorPerceptron.activate([1,0,0,1]));