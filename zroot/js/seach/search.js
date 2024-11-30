  function searchOverlay(query, caseInsensitive) {
    if (typeof query == "string")
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"), caseInsensitive ? "gi" : "g");
    else if (!query.global)
      query = new RegExp(query.source, query.ignoreCase ? "gi" : "g");

    return {token: function(stream) {
      query.lastIndex = stream.pos;
      var match = query.exec(stream.string);
      if (match && match.index == stream.pos) {
        stream.pos += match[0].length || 1;
        return "searching";
      } else if (match) {
        stream.pos = match.index;
      } else {
        stream.skipToEnd();
      }
    }};
  }

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }

  function queryCaseInsensitive(cm) {
    return search.caseFold?false:true;
//		return false;
  }

  function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, {caseFold: queryCaseInsensitive(cm), multiline: true});
  }

  function persistentDialog(cm, text, deflt, onEnter, onKeyDown) {
    cm.openDialog(text, onEnter, {
      value: deflt,
      selectValueOnOpen: true,
      closeOnEnter: false,
      onClose: function() { clearSearch(cm); },
      onKeyDown: onKeyDown
    });
  }

  function dialog(cm, text, shortText, deflt, f) {
    if (cm.openDialog) cm.openDialog(text, f, {value: deflt, selectValueOnOpen: true});
    else f(prompt(shortText, deflt));
  }

  function confirmDialog(cm, text, shortText, fs) {
    if (cm.openConfirm) cm.openConfirm(text, fs);
    else if (confirm(shortText)) fs[0]();
  }

  function parseString(string) {
    return string.replace(/\\(.)/g, function(_, ch) {
      if (ch == "n") return "\n"
      if (ch == "r") return "\r"
      return ch
    })
  }

  function parseQuery(cm,query) {
    var isRE = search.zhengze;
    var isWhole = search.whole;
    var iscaseFold = search.caseFold;
    if (isRE) {
    		query = '\/'+query+'\/g';
    }else if(isWhole){
    		query = '\/\\b'+query+'\\b\/g';
    }
    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try { query = new RegExp(isRE[1], iscaseFold ? "" : "i"); }
      catch(e) {} // Not a regular expression after all, do a string search
    } else {
//    query = parseString(query)
    }
    if (typeof query == "string" ? query == "" : query.test(""))
      query = /x^/;
    	return query;
  }

  var queryDialog =
    '<span class="CodeMirror-search-label">Search:</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>';

  function startSearch(cm, state, query) {
    state.queryText = query;
    state.query = parseQuery(cm,query);
    cm.removeOverlay(state.overlay, queryCaseInsensitive(cm));
    state.overlay = searchOverlay(state.query, queryCaseInsensitive(cm));
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) { state.annotate.clear(); state.annotate = null; }
      state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(cm));
    }
  }

  function doSearch(cm,query,rev,cam) {
    var state = getSearchState(cm);
    var to ="";
    var cam = "";
    if (query) cm.operation(function() {
      startSearch(cm, state, query);
      if(rev==1){
      	rev = false;
      	cam = false;
      	to = "from";
      }else if(rev==2){
      	rev = search.searchafter;
      	cam = true;
      	to = rev ? "from":"to";
      }else if(rev==3){
      	rev = search.searchafter;
      	cam = true;
      	to = rev ? "to":"from";
      }
      findNext(cm,rev,cam,to);
    });
  }

  function findNext(cm, rev, cam,to,callback) {cm.operation(function() {
    var state = getSearchState(cm);
    var cursor = getSearchCursor(cm, state.query, cm.getCursor(to));
    if (!cursor.find(rev)) {
      cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
      if (!cursor.find(rev)) return;
    }
	  if(cam){
	  	cm.setSelection(cursor.from(), cursor.to());
	  	cm.scrollIntoView({from: cursor.from(), to: cursor.to()}, 20);
	  }
    if (callback) callback(cursor.from(), cursor.to())
  });}

  function clearSearch(cm) {cm.operation(function() {
    var state = getSearchState(cm);
    state.lastQuery = state.query;
    if (!state.query) return;
    state.query = state.queryText = null;
    cm.removeOverlay(state.overlay);
    if (state.annotate) { state.annotate.clear(); state.annotate = null; }
  });}

  var replaceQueryDialog =
    ' <input type="text" style="width: 10em" class="CodeMirror-search-field"/> <span style="color: #888" class="CodeMirror-search-hint">(Use /re/ syntax for regexp search)</span>';
  var replacementQueryDialog = '<span class="CodeMirror-search-label">With:</span> <input type="text" style="width: 10em" class="CodeMirror-search-field"/>';
  var doReplaceConfirm = '<span class="CodeMirror-search-label">Replace?</span> <button>Yes</button> <button>No</button> <button>All</button> <button>Stop</button>';

  function replaceAll(cm, query, text) {
    cm.operation(function() {
    	var isRE = search.zhengze;
    	if(isRE){
    		text = parseString(text);
    	}
    	query =  parseQuery(cm,query);
      for (var cursor = getSearchCursor(cm, query); cursor.findNext();) {
        if (typeof query != "string") {
          var match = cm.getRange(cursor.from(), cursor.to()).match(query);
          cursor.replace(typeof query == "string" ? text :
   	  			text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
        } else cursor.replace(text);
      }
    });
  }

  function replace(cm,srt,text) {
    if (cm.getOption("readOnly")) return;
    var query = cm.getSelection() || getSearchState(cm).lastQuery;
      if (!query) return;
      var srt = parseQuery(cm,srt);
      var isRE = search.zhengze;
    	if(isRE){
    		text = parseString(text);
    	}
      var rev = search.searchafter;
  	  var to = rev ? "to":"from";
      var cursor = getSearchCursor(cm, srt, cm.getCursor(to));
      cursor.find(rev);
      var match = "";
      if(typeof srt != "string"){
      	match =query.match(srt)
      }
      cursor.replace(typeof srt == "string" ? text :
   	  text.replace(/\$(\d)/g, function(_, i) {return match[i];}));
      cm.setSelection(cursor.from(),cursor.to());
  }
