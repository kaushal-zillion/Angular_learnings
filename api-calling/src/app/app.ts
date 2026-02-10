import { Component } from '@angular/core';
import { PostList } from './components/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [PostList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
}

// 1. Reactivity (Signals)
// signal(): A writable variable. Does: Stores state. Returns: A function to read/update data.
// toSignal(): An auto-updating variable. Does: Converts an API (Observable) into a Signal. Returns: A read-only stream.

// 2. Communication (In/Out)
// input(): Data entering. Does: Receives data from Parent. Returns: A Signal.
// output(): Events leaving. Does: Notifies Parent of actions. Returns: An event emitter.
// emit(): The trigger. Does: Sends the event message. Returns: void.

// 3. Data Processing (RxJS)
// pipe(): The assembly line. Does: Links data-processing steps. Returns: A modified Observable.
// map(): The transformer. Does: Changes data format. Returns: The new data version.
