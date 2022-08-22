import React from 'react';
import { useEffect } from 'react';

function PromiseExample(props) {

    const One = () => {
        return "one"
    }

    const Two = () => {
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("two")
            }, timeout);
        })
    return p

    }

    const Three = () => {
        return "three"
    }

    const all = async () => {
        const oneAns = One()
        console.log(oneAns);

        const twoAns = One()
        console.log(twoAns);

        const threeAns = One()
        console.log(threeAns);
    }

    useEffect(() => {
        all()
    },[])

    const Ans = (b) => {
        console.log(b);
    }

    const sum = (a, b, callbackFun) => {
        let sum = 0
        sum = a + b;
        callbackFun(sum)
    }
    sum (10, 25, Ans)

    const Ex1 = "nenu";
    const Ex2 = 789
    const Ex3 = new Promise((resolve , reject) => {
        setTimeout(() => {
            resolve("three");
        }, 2000);
    })
    Promise.all([Ex1, Ex2, Ex3]).then((values) => {
        console.log(values);
    })

    return(
        <div>
            <h2>
                PromiseExample
            </h2>
        </div>
    )
}

export default PromiseExample;