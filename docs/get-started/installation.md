# Installing x-dash

TODO


## Requirements

To get started with x-dash, you'll need to make sure you have the following software tools installed.

1. [Git](https://git-scm.com/)
2. [Make](https://www.gnu.org/software/make/)
3. [Node.js](https://nodejs.org/en/) (version 8 or higher is required)
4. [npm](http://npmjs.com/)

Please note that x-dash has only been tested in Mac and Linux environments. If you are on a Mac you may find it easiest to install the [Command Line Tools](https://developer.apple.com/download/more/) package which includes Git and Make.


## Project setup

1. Clone the x-dash Git repository and change to the new directory that has been created:

    ```bash
    git clone git@github.com:financial-times/x-dash
    cd x-dash
    ```

2. Install all of the project dependendencies (this may take a few minutes if you are running this for the first time):

    ```bash
    make install
    ```

3. Start Storybook to view the current set of x-dash components:

    ```bash
    npm run start-storybook
    ```
