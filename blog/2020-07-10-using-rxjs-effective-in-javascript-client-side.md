---
title: Using rxjs effective in javascript client side (browser)
subtitle: ReactiveX JS
tags: [javascript, rxjs]
authors: [niko]
---

Using rxjs effective in javascript client side (browser)

<!-- truncate -->

### 1. Supscription

- Alway destroy subscription when component destroy. When subscription created by call 'subscribe', a listen will be created for handle event & callback function. So, if these not destrioy, that still on memory, memory leak can occured. This solution, we will destroy them when these compeleted, suggest on component destroy; using 'unsubscribe' from subscription context.

```javascript
import { Subscription } from "rxjs";

export class MyComponent extends React.Component {
  _mySerive: MyService = new MyService();
  _subscriptions: Subscription[] = [];

  constructor(props) {
    super(props);
    this.state = {
        userName: "Jasmine",
        userEmail: "jasmine@mail.com"
    }
  }

  componentDidMount() {
    this._loadAsyncUserName();
  }

  componentWillMount() {
    this._subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  _loadAsyncUserName() {
      this._subscriptions.push(
          this._mySerive.getAsyncUserName().subscribe(fullName => {
              this.setState({
                  userName: fullName
              });
          });
      );

      this._subscriptions.push(
          this._mySerive.getAsyncEmail().subscribe(email => {
              this.setState({
                  userEmail: email
              });
          });
      );
  }

  render() {
      const { userName, userEmail } = this.state;

      return <div className="my-component">
            <p>{userName}</p>
            <p>{userEmail}</p>
      </div>;
  }
}
```

- Handle error when subscription throw error, that assure this behavior without crash when error occured.

```javascript
    this._mySerive.getAsyncEmail().subscribe(
        email => {
            this.setState({
                userEmail: email
            });
        },
        error => {
            handleError(error)
        }
    );
```

### 2. Concurency

Using 'forkJoin' + 'concatMap/map' to control multiple async request before move them to next step.

```javascript
import { forkJoin } from "rxjs";
import { concatMap, map } from "rxjs/operators";

forkJoin(
    this._mySerive.getAsyncUserName(),
    this._mySerive.getAsyncEmail()
).pipe(
    concatMap(([userName, userEmail]) => {
        return  this._mySerivecheckUserInfoAsync(userName, userEmail);
    }),
    map((existUser) => {
        return {
            isExistUser: existUser != null,
            userName: existUser.userName,
            userEmail: existUser.userEmail
        };
    })
);

```

### 3. Synchronus flow

Using 'forkJoin' + 'concatMap/map' to control multiple async request to synchronus flow, step by step.

```javascript
import { forkJoin } from "rxjs";
import { concatMap, map } from "rxjs/operators";

async function validateUserInfoAsync([userName, userEmail]) {
    return  this._mySerive.checkUserInfoAsync(userName, userEmail); 
}

async function getAllHistory({userName, userEmail}) {
    return  this._mySerive.getAllHistory(userName, userEmail); 
}

forkJoin(
    this._mySerive.getAsyncUserName(),
    this._mySerive.getAsyncEmail()
).pipe(
    // validate user
    concatMap(validateUserInfoAsync),
    // get all user credit history
    concatMap(getAllHistory),
    // map data
    map(({userName, userEmail, histories}) => {
        return {
            userName: userName,
            userEmail: userEmail,
            histories: histories
        };
    })
);

```

### 4. References

- [RxJS Subscription](http://reactivex.io/rxjs/class/es6/Subscription.js~Subscription.html)
- [Rxjs Observable](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-map)
- [Rxjs ConcatMap](http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-concatMap)
