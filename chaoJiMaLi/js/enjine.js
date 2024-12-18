var Enjine = {
    GameCanvas: function() {
        this.BackBufferContext2D = this.BackBuffer = this.Context2D = this.Canvas = null
    }
};
Enjine.GameCanvas.prototype = {
    Initialize: function(a, b, c) {
        this.Canvas = document.getElementById(a);
        this.Context2D = this.Canvas.getContext("2d");
        this.BackBuffer = document.createElement("canvas");
        this.BackBuffer.width = b;
        this.BackBuffer.height = c;
        this.BackBufferContext2D = this.BackBuffer.getContext("2d")
    },
    BeginDraw: function() {
        this.BackBufferContext2D.clearRect(0, 0, this.BackBuffer.width, this.BackBuffer.height);
        this.Context2D.clearRect(0, 0, this.Canvas.width, this.Canvas.height)
    },
    EndDraw: function() {
        this.Context2D.drawImage(this.BackBuffer, 0, 0, this.BackBuffer.width, this.BackBuffer.height, 0, 0, this.Canvas.width, this.Canvas.height)
    }
};
Enjine.Keys = {
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 80,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40
};
Enjine.KeyboardInput = {
    Pressed: [],
    Initialize: function() {
        var a = this;
        document.onkeydown = function(b) {
            a.KeyDownEvent(b)
        }
        ;
        document.onkeyup = function(b) {
            a.KeyUpEvent(b)
        }
    },
    IsKeyDown: function(a) {
        if (this.Pressed[a] != null)
            return this.Pressed[a];
        return !1
    },
    KeyDownEvent: function(a) {
        this.Pressed[a.keyCode] = !0;
        this.PreventScrolling(a)
    },
    KeyUpEvent: function(a) {
        this.Pressed[a.keyCode] = !1;
        this.PreventScrolling(a)
    },
    PreventScrolling: function(a) {
        a.keyCode >= 37 && a.keyCode <= 40 && a.preventDefault()
    }
};
Enjine.Resources = {
    Images: {},
    Sounds: {},
    Destroy: function() {
        delete this.Images;
        delete this.Sounds;
        return this
    },
    AddImage: function(a, b) {
        var c = new Image;
        this.Images[a] = c;
        c.src = b;
        return this
    },
    AddImages: function(a) {
        for (var b = 0; b < a.length; b++) {
            var c = new Image;
            this.Images[a[b].name] = c;
            c.src = a[b].src
        }
        return this
    },
    ClearImages: function() {
        delete this.Images;
        this.Images = {};
        return this
    },
    RemoveImage: function(a) {
        delete this.Images[a];
        return this
    },
    AddSound: function(a, b, c) {
        this.Sounds[a] = [];
        this.Sounds[a].index = 0;
        c || (c = 3);
        for (var d = 0; d < c; d++)
            this.Sounds[a][d] = new Audio(b);
        return this
    },
    ClearSounds: function() {
        delete this.Sounds;
        this.Sounds = {};
        return this
    },
    RemoveSound: function(a) {
        delete this.Sounds[a];
        return this
    },
    PlaySound: function(a, b) {
    	console.log(a);
        if (this.Sounds[a].index >= this.Sounds[a].length)
            this.Sounds[a].index = 0;
        b && this.Sounds[a][this.Sounds[a].index].addEventListener("ended", this.LoopCallback, !1);
        this.Sounds[a][this.Sounds[a].index++].play();
        return this.Sounds[a].index
    },
    PauseChannel: function(a, b) {
        this.Sounds[a][b].paused || this.Sounds[a][b].pause();
        return this
    },
    PauseSound: function(a) {
        for (var b = 0; b < this.Sounds[a].length; b++)
            this.Sounds[a][b].paused || this.Sounds[a][b].pause();
        return this
    },
    ResetChannel: function(a, b) {
        this.Sounds[a][b].currentTime = 0;
        this.StopLoop(a, b);
        return this
    },
    ResetSound: function(a) {
        for (var b = 0; b < this.Sounds[a].length; b++)
            this.Sounds[a].currentTime = 0,
            this.StopLoop(a, b);
        return this
    },
    StopLoop: function(a, b) {
        this.Sounds[a][b].removeEventListener("ended", this.LoopCallback, !1)
    },
    LoopCallback: function() {
        this.currentTime = -1;
        this.play()
    }
};
Enjine.Drawable = function() {
    this.ZOrder = 0
}
;
Enjine.Drawable.prototype = {
    Draw: function() {}
};
Enjine.GameStateContext = function(a) {
    this.State = null;
    if (a != null)
        this.State = a,
        this.State.Enter()
}
;
Enjine.GameStateContext.prototype = {
    ChangeState: function(a) {
        this.State != null && this.State.Exit();
        this.State = a;
        this.State.Enter()
    },
    Update: function(a) {
        this.State.CheckForChange(this);
        this.State.Update(a)
    },
    Draw: function(a) {
        this.State.Draw(a)
    }
};
Enjine.GameState = function() {}
;
Enjine.GameState.prototype = {
    Enter: function() {},
    Exit: function() {},
    Update: function() {},
    Draw: function() {},
    CheckForChange: function() {}
};
Enjine.GameTimer = function() {
    this.FramesPerSecond = 1E3 / 30;
    this.LastTime = 0;
    this.UpdateObject = this.IntervalFunc = null
}
;
Enjine.GameTimer.prototype = {
    Start: function() {
        this.LastTime = (new Date).getTime();
        var a = this;
        this.IntervalFunc = setInterval(function() {
            a.Tick()
        }, this.FramesPerSecond)
    },
    Tick: function() {
        if (this.UpdateObject != null) {
            var a = (new Date).getTime()
              , b = (a - this.LastTime) / 1E3;
            this.LastTime = a;
            this.UpdateObject.Update(b)
        }
    },
    Stop: function() {
        clearInterval(this.IntervalFunc)
    }
};
Enjine.Camera = function() {
    this.Y = this.X = 0
}
;
Enjine.DrawableManager = function() {
    this.Unsorted = !0;
    this.Objects = []
}
;
Enjine.DrawableManager.prototype = {
    Add: function(a) {
        this.Objects.push(a);
        this.Unsorted = !0
    },
    AddRange: function(a) {
        this.Objects = this.Objects.concat(a);
        this.Unsorted = !0
    },
    Clear: function() {
        this.Objects.splice(0, this.Objects.length)
    },
    Contains: function(a) {
        for (var b = this.Objects.length; b--; )
            if (this.Objects[b] === a)
                return !0;
        return !1
    },
    Remove: function(a) {
        this.Objects.splice(this.Objects.indexOf(a), 1)
    },
    RemoveAt: function(a) {
        this.Objects.splice(a, 1)
    },
    RemoveRange: function(a, b) {
        this.Objects.splice(a, b)
    },
    RemoveList: function(a) {
        for (var b = 0, c = 0, c = 0; c < a.length; )
            for (b = 0; b < this.Objects.length; b++)
                if (this.Objects[b] === a[c]) {
                    this.Objects.splice(b, 1);
                    a.splice(c, 1);
                    c--;
                    break
                }
    },
    Update: function(a) {
        for (var b = 0, b = 0; b < this.Objects.length; b++)
            this.Objects[b].Update && this.Objects[b].Update(a)
    },
    Draw: function(a, b) {
        if (this.Unsorted)
            this.Unsorted = !1,
            this.Objects.sort(function(a, b) {
                return a.ZOrder - b.ZOrder
            });
        for (var c = 0, c = 0; c < this.Objects.length; c++)
            this.Objects[c].Draw && this.Objects[c].Draw(a, b)
    }
};
Enjine.Sprite = function() {
    this.Y = this.X = 0;
    this.Image = null
}
;
Enjine.Sprite.prototype = new Enjine.Drawable;
Enjine.Sprite.prototype.Draw = function(a, b) {
    a.drawImage(this.Image, this.X - b.X, this.Y - b.Y)
}
;
Enjine.SpriteFont = function(a, b, c, d, e) {
    this.Image = b;
    this.Letters = e;
    this.LetterWidth = c;
    this.LetterHeight = d;
    this.Strings = a
}
;
Enjine.SpriteFont.prototype = new Enjine.Drawable;
Enjine.SpriteFont.prototype.Draw = function(a) {
    for (var b = 0; b < this.Strings.length; b++)
        for (var c = this.Strings[b], d = 0; d < c.String.length; d++) {
            var e = c.String.charCodeAt(d);
            a.drawImage(this.Image, this.Letters[e].X, this.Letters[e].Y, this.LetterWidth, this.LetterHeight, c.X + this.LetterWidth * (d + 1), c.Y, this.LetterWidth, this.LetterHeight)
        }
}
;
Enjine.FrameSprite = function() {
    this.FrameHeight = this.FrameWidth = this.FrameY = this.FrameX = 0
}
;
Enjine.FrameSprite.prototype = new Enjine.Sprite;
Enjine.FrameSprite.prototype.Draw = function(a, b) {
    a.drawImage(this.Image, this.FrameX, this.FrameY, this.FrameWidth, this.FrameHeight, this.X - b.X, this.Y - b.Y, this.FrameWidth, this.FrameHeight)
}
;
Enjine.AnimationSequence = function(a, b, c, d) {
    this.StartRow = a;
    this.StartColumn = b;
    this.EndRow = c;
    this.EndColumn = d;
    this.SingleFrame = !1;
    if (this.StartRow == this.EndRow && this.StartColumn == this.EndColumn)
        this.SingleFrame = !0
}
;
Enjine.AnimatedSprite = function() {
    this.LastElapsed = 0;
    this.FramesPerSecond = 0.05;
    this.CurrentSequence = null;
    this.Looping = this.Playing = !1;
    this.Columns = this.Rows = 0;
    this.Sequences = {}
}
;
Enjine.AnimatedSprite.prototype = new Enjine.FrameSprite;
Enjine.AnimatedSprite.prototype.Update = function(a) {
    if (!this.CurrentSequence.SingleFrame && this.Playing && (this.LastElapsed -= a,
    !(this.LastElapsed > 0))) {
        this.LastElapsed = this.FramesPerSecond;
        this.FrameX += this.FrameWidth;
        if (this.FrameX > this.Image.width - this.FrameWidth && (this.FrameX = 0,
        this.FrameY += this.FrameHeight,
        this.FrameY > this.Image.height - this.FrameHeight))
            this.FrameY = 0;
        a = !1;
        this.FrameX > this.CurrentSequence.EndColumn * this.FrameWidth && this.FrameY == this.CurrentSequence.EndRow * this.FrameHeight ? a = !0 : this.FrameX == 0 && this.FrameY > this.CurrentSequence.EndRow * this.FrameHeight && (a = !0);
        if (a)
            this.Looping ? (this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth,
            this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight) : this.Playing = !1
    }
}
;
Enjine.AnimatedSprite.prototype.PlaySequence = function(a, b) {
    this.Playing = !0;
    this.Looping = b;
    this.CurrentSequence = this.Sequences["seq_" + a];
    this.FrameX = this.CurrentSequence.StartColumn * this.FrameWidth;
    this.FrameY = this.CurrentSequence.StartRow * this.FrameHeight
}
;
Enjine.AnimatedSprite.prototype.StopLooping = function() {
    this.Looping = !1
}
;
Enjine.AnimatedSprite.prototype.StopPlaying = function() {
    this.Playing = !1
}
;
Enjine.AnimatedSprite.prototype.SetFrameWidth = function(a) {
    this.FrameWidth = a;
    this.Rows = this.Image.width / this.FrameWidth
}
;
Enjine.AnimatedSprite.prototype.SetFrameHeight = function(a) {
    this.FrameHeight = a;
    this.Columns = this.Image.height / this.FrameHeight
}
;
Enjine.AnimatedSprite.prototype.SetColumnCount = function(a) {
    this.FrameWidth = this.Image.width / a;
    this.Columns = a
}
;
Enjine.AnimatedSprite.prototype.SetRowCount = function(a) {
    this.FrameHeight = this.Image.height / a;
    this.Rows = a
}
;
Enjine.AnimatedSprite.prototype.AddExistingSequence = function(a, b) {
    this.Sequences["seq_" + a] = b
}
;
Enjine.AnimatedSprite.prototype.AddNewSequence = function(a, b, c, d, e) {
    this.Sequences["seq_" + a] = new Enjine.AnimationSequence(b,c,d,e)
}
;
Enjine.AnimatedSprite.prototype.DeleteSequence = function(a) {
    this.Sequences["seq_" + a] != null && delete this.Sequences["seq_" + a]
}
;
Enjine.AnimatedSprite.prototype.ClearSequences = function() {
    delete this.Sequences;
    this.Sequences = {}
}
;
Enjine.Collideable = function(a, b, c, d) {
    this.Base = a;
    this.X = a.X;
    this.Y = a.Y;
    this.Width = b;
    this.Height = c;
    this.CollisionEvent = d != null ? d : function() {}
}
;
Enjine.Collideable.prototype = {
    Update: function() {
        this.X = this.Base.X;
        this.Y = this.Base.Y
    },
    CheckCollision: function(a) {
        !(this.Y + this.Height < a.Y) && !(this.Y > a.Y + a.Height) && !(this.X + this.Width < a.X) && !(this.X > a.X + a.Width) && (this.CollisionEvent(a),
        a.CollisionEvent(this))
    }
};
Enjine.Application = function() {
    this.stateContext = this.timer = this.canvas = null
}
;
Enjine.Application.prototype = {
    Update: function(a) {
        this.stateContext.Update(a);
        this.canvas.BeginDraw();
        this.stateContext.Draw(this.canvas.BackBufferContext2D);
        this.canvas.EndDraw()
    },
    Initialize: function(a, b, c) {
        this.canvas = new Enjine.GameCanvas;
        this.timer = new Enjine.GameTimer;
        Enjine.KeyboardInput.Initialize();
        this.canvas.Initialize("canvas", b, c);
        this.timer.UpdateObject = this;
        this.stateContext = new Enjine.GameStateContext(a);
        this.timer.Start()
    }
};
