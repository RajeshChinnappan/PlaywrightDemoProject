import type {
    FullConfig, FullResult, Reporter, Suite, TestCase, TestResult
} from '@playwright/test/reporter';

class MyReporter implements Reporter {

    passedCount: number = 0;
    failedCount: number = 0;
    failedRetryCount: number = 0;

    // constructor(passedCount : number = 0, failedCount : number = 0){

    // }

    onBegin(config: FullConfig, suite: Suite) {
        console.log(suite.titlePath);
        console.log(`Starting the run with ${suite.allTests().length} tests`);
    }

    // onTestBegin(test: TestCase, result: TestResult) {
    //   console.log(`Starting test ${test.title}`);
    // }

    onTestEnd(test: TestCase, result: TestResult) {
        console.log(`Finished test ${test.title}: ${result.status}  `);
        if (result.status === 'passed') {
            this.passedCount++;
        }
        else if (result.status === 'failed' ) {
           this.failedRetryCount++;
            if(this.failedRetryCount === 3){
                this.failedCount++;
                this.failedRetryCount = 0;
            }
            
        }
    }

    onEnd(result: FullResult) {
        // console.log(`Finished the run: ${result.status} `);
        console.log(`Passed Count : ${this.passedCount} `);
        console.log(`Failed Count :  ${this.failedCount}`);
        console.log(`Total Count  :  ${this.passedCount + this.failedCount}`);
    }
}

export default MyReporter;

