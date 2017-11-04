process.stdin.resume();

var input_stdin = "";

process.stdin.on('data', function (data)
{
    input_stdin = data.split("\n");
    main();
});

function readLine()
{
    return input_stdin;
}

function generate(n) // generate an array that contains a spiral up to the given number
{
    let size = Math.ceil(Math.sqrt(n + 1)),  // include 0, overall++
        arr = [... Array(size + 2).keys()].map(i => Array(size + 2)); // preallocate with arrow function

    let curr_y = size / 2 >> 0,  // integer division, get center coordinates
        curr_x = size / 2 >> 0,
        curr = 0; // current value in our journey from 0 to n

    let is_done = false;
    // Generate Square
    for (let steps = 1; steps <= size && !is_done; steps++)
    {
        if (steps % 2 !== 0)
        {
            for (let i = 0; i < steps && !is_done; i++)  // go right
            {
                arr[curr_y][curr_x + i] = curr;
                curr++;
                if(curr > n) is_done = true;
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

function print(arr, n = false)  // pretty printing
{
    // if given, convert n to an int, else, find n in matrix.
    n = n ? n >> 0 :  Math.max.apply(null, arr.map(function(row){ return Math.max.apply(Math, row); }));

    let digits_n = n.toString().length;

    for(let row of arr)
    {
        for(let num of row)
        {
            if (typeof num === 'undefined')
            {
                process.stdout.write(" ".repeat(digits_n + 1));  // plus one for the space we add after each num
                continue;
            }

            let digits_num = num.toString().length,
                diff = digits_n - digits_num;

            process.stdout.write(" ".repeat(diff));
            process.stdout.write(num.toString() + " ");
        }
        console.log()
    }
}

function main()
{
    let n = parseInt(readLine());  // parse input

    let arr = generate(n);

    print(arr);
    // print(arr, n);

    process.exit();
}
