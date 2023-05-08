import { end, X, Y } from "./grid/gridManager.js";
import { getEucledianDistance } from "./algorithms/optimizedAStar.js";

var running = false;

var context = new AudioContext();
var osc = context.createOscillator();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.setValueAtTime(0, context.currentTime);
osc.connect(gain);
osc.start(0);

export async function setFrequency(x, y) {
	osc.frequency.value = calcFrequency(x, y);
}

export function start() {
	//if (!running) {
	gain.gain.setValueAtTime(0.5, context.currentTime);
	running = true;
	// }
}

export function stop() {
	if (running) {
		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.2);
		running = false;
	}
}

export async function click(x, y) {
	setFrequency(x, y);
	if (!running) {
		gain.gain.exponentialRampToValueAtTime(0.5, context.currentTime + 0.05);

		gain.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.25);
	}
}

function calcFrequency(x, y) {
	var distance = getEucledianDistance([x, y], end);
	var maxDistance = getEucledianDistance([0, 0], [X, Y]);
	var f = lerp((distance / maxDistance) ** 0.5, 1500, 250);
	return f;
}

function lerp(alpha, a, b) {
	return a + alpha * (b - a);
}
