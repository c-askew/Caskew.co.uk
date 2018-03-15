window.onload = function () {
    var calc = new calculate('X', 'Y', 'Output');
};
//When the window loads, we will load the variable calc with 

interface ICalcFunction {
    //Creates an interface named ICalcFucntion. This is an object which has had it's shape designed rather than just it's values.
    //Typescript is a strongly typed language, meaning that any variable which is identified must also have it's type specifically declared. 
    //In this program, we are using the ICalcFunction interface so that we can pass two number variables into a function,
    //and receive a single number back from it. This interface will not be compiled into the javascript. This also helps to identify,
    //typing mismatches when they happen. 
    (x: number, y: number): number;
    //In typescript, there are 6 so-called primitive types. These are: number, string, boolean, symbol, null and undefined. 
}

class calculate {
    private x: HTMLInputElement;
    private y: HTMLInputElement;
    private output: HTMLSpanElement;
    //Creates a new class named 'calculate', which will be using x, y and output variables privately. This gives a level of abstraction
    //to the code, since these X and Y values will not be useable by anything outside of this class. This can be helpful if ever trying
    //to use X and Y in another part of the code, since you will not recieve any conflicts.
    //Each of these variables have been declared as HTML ELement types, specifically Input and Span Elements. This is done so that we can
    //access properties specific to that typing. For example, most HTML elements will have an innerHTML property, which is what we will be
    //accessing later in this code.


    constructor(xId: string, yId: string, outputId: string) {
        this.x = <HTMLInputElement>document.getElementById(xId);
        this.y = <HTMLInputElement>document.getElementById(yId);
        this.output = <HTMLSpanElement>document.getElementById(outputId);
        this.wireEvents();
        //Calls the wireEvents function inside this class.
    }

    wireEvents() {
        document.getElementById('Add').addEventListener('click',
            event => {
                var result = this.add(parseInt(this.x.value), parseInt(this.y.value));
                this.output.innerHTML = result.toString();
            });
        //Creates a event listener on the Add ID'd element in the document, which when that event is triggered, parses the value of x and y in this
        //class into integer values and passes them to the add method of this class. The value that is returned by that method is then put into the
        //innerHTML property of the output in this class as a string.
        //An important note to point out here is the use of a lambda expression in place of a typical function(). A Lambda expression is essentially
        //a short-hand method of function() which also captures the contextual meaning of 'this' when it occurs, so that you will not run into issues
        //where the scope for 'this' has changed from what you want it to be, which is often an issue for JavaScript.

        //The next three sections of code work the same as the previous, however they calling different methods for each. 
        document.getElementById('Subtract').addEventListener('click',
            event => {
                var result = this.subtract(parseInt(this.x.value), parseInt(this.y.value));
                this.output.innerHTML = result.toString();
            });
        document.getElementById('Divide').addEventListener('click',
            event => {
                var result = this.divide(parseInt(this.x.value), parseInt(this.y.value));
                this.output.innerHTML = result.toString();
            });
        document.getElementById('Multiply').addEventListener('click',
            event => {
                var result = this.multiply(parseInt(this.x.value), parseInt(this.y.value));
                this.output.innerHTML = result.toString();
            });
    }

    //The following 4 statements are methods that all use the same Interface, and as such all receive the same information,
    //but then perform a slightly different functionality with the data when they are called. Using interfaces for this means
    //that we always have consistency of what X, Y and the return value are, as there types are described once in the interface, 
    //as opposed to every time within these methods. Any changes that need to made these values can simply be made once in the interface.
    add: ICalcFunction = (x, y) => {
        return x + y;
    }
    subtract: ICalcFunction = (x, y) => {
        return x - y;
    }
    divide: ICalcFunction = (x, y) => {
        return x / y;
    }
    multiply: ICalcFunction = (x, y) => {
        return x * y;
    }
}
