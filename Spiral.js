process.stdin.resume();
process.stdin.setEncoding('utf8');

var input_stdin = "";

process.stdin.on('data', function (data)
{
    input_stdin = data.split("\n");
    main();
});

function readLine()
{
    let val = parseInt(input_stdin);
    if (isNaN(val))
    {
        console.log("Sorry, that doesn't seem to be an integer.");
        process.exit(1);
    } else if(val < 0)
    {
        console.log("Sorry, only positive integers are allowed.");
        process.exit(1);
    } else {
        return val;
    }
}

function generate(n)  // generate an array that contains a spiral up to the given number
{
    let size = Math.ceil(Math.sqrt(n + 1)) + 1,  // include 0, add 1 for breathing room (in the case of even side length)
        arr = [... Array(size).keys()].map(i => Array(size));  // preallocate with arrow function

    let curr_y = size / 2 >> 0,  // integer division, get center coordinates
        curr_x = size / 2 >> 0,
        curr = 0; // current value in our journey from 0 to n

    let is_done = false;  // may reach our goal at any point. Constantly check
    // Generate Square
    for (let steps = 1; steps <= size && !is_done; steps++)
    {
        if (steps % 2 !== 0)  // we make 2 turns per loop, so switch off every other step increment
        {
            for (let i = 0; i < steps && !is_done; i++)  // go right
            {
                arr[curr_y][curr_x + i] = curr;
                curr++;
                if(curr > n) is_done = true;  // check
            }
            curr_x += steps;
            for (let j = 0; j < steps && !is_done; j++)  // go down
            {
                arr[curr_y + j][curr_x] = curr;
                curr++;
                if(curr > n) is_done = true;
            }
            curr_y += steps;
        }
        else
        {
            for (let i = 0; i < steps && !is_done; i++)  // go left
            {
                arr[curr_y][curr_x - i] = curr;
                curr++;
                if(curr > n) is_done = true;
            }
            curr_x -= steps;
            for (let j = 0; j < steps && !is_done; j++)  // go up
            {
                arr[curr_y - j][curr_x] = curr;
                curr++;
                if(curr > n) is_done = true;
            }
            curr_y -= steps;
        }
    }
    return arr;
}

function print(arr, n = false)  // pretty printing for n < 10,000
{
    // if given, convert n to an int, else, find n in matrix.
    n = n ? n >> 0 :  Math.max.apply(null, arr.map(function(row){ return Math.max.apply(Math, row); }));

    for(let row of arr)
    {
        for(let num of row)
        {
            if (typeof num === 'undefined')  // print spacing to match largest int (n)
            {
                if((n/10 >> 0) >= 1)        {process.stdout.write("     ");}  // spacing
                else if((n/100 >> 0) >= 1)  {process.stdout.write("    ");}
                else if((n/1000 >> 0) >= 1) {process.stdout.write("   ");}
                else {process.stdout.write("    ");}  // hardcoded tears
                process.stdout.write(" ");  // change this space to a dot to visualize spacing
                continue;
            }
            if(num < 10)        {process.stdout.write("   ");}  // spacing
            else if(num < 100)  {process.stdout.write("  ");}
            else if(num < 1000) {process.stdout.write(" ");}

            process.stdout.write(num.toString() + " ");
        }
        console.log()
    }
}

function main()
{
    let n = readLine();  // get input

    let arr = generate(n);

    print(arr);
    // print(arr, n); // provide n-value for better performance

    process.exit(0);
}
