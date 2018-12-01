// ==UserScript==
// @name                GithubDashboardEnhance
// @description         Show the latest 30 starred repos in new Github dashboard and shortcuts in header navigation.
// @description:zh-CN   在 Github 新首页显示最近 30 个 star 项目，在头部导航栏中显示快捷方式
// @description:zh-TW   在 Github 新首頁顯示最近 30 個 star 項目，在頭部導航欄中顯示快捷方式
// @author              ladit
// @version             1.0.6
// @namespace           https://greasyfork.org/zh-CN/scripts/33511
// @homepageURL         https://github.com/ladit/Userscripts
// @supportURL          https://github.com/ladit/Userscripts
// @note                Partial reference from https://greasyfork.org/zh-CN/scripts/25101 by zhihaofans
// @note                Opt in new dashboard before using this script
// @grant               GM_xmlhttpRequest
// @grant               GM_setValue
// @grant               GM_getValue
// @run-at              document-idle
// @include             https://github.com/*
// ==/UserScript==

var userName = document.querySelector('meta[name="user-login"]').content;
if (userName != '') {
  document.querySelector('div.HeaderMenu nav ul.flex-items-center.text-bold.list-style-none').insertAdjacentHTML('beforeEnd', '<li><a class="js-selected-navigation-item HeaderNavlink pl-lg-4 px-lg-2 py-2 py-lg-0" href="/' + userName + '">Profile</a></li><li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/' + userName + '?tab=repositories">Repositories</a></li><li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/' + userName + '?tab=stars">Stars</a></li><li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="https://gist.github.com/">Gists</a></li>');
  var rightColumn = document.querySelector('.team-left-column.col-12.col-md-3.col-lg-3.pr-5.mt-5.hide-lg.hide-md.hide-sm.border-bottom');
  if (rightColumn != null && GM_getValue('lastStoreStarredReposTime', 0) + 86400000 < Date.now()) {
    GM_xmlhttpRequest({
      url: 'https://api.github.com/users/' + userName + '/starred',
      method: 'GET',
      timeout: 45e3,
      onload: function (response) {
        var starredReposBlock = '<h4 class="f5 text-bold mb-1">Recent starred repos</h4>';
        var languageColor = new Map([["1C Enterprise", "#814CCC"], ["ABAP", "#E8274B"], ["ActionScript", "#882B0F"], ["Ada", "#02f88c"], ["Agda", "#315665"], ["AGS Script", "#B9D9FF"], ["Alloy", "#64C800"], ["Alpine Abuild", "null"], ["AMPL", "#E6EFBB"], ["AngelScript", "#C7D7DC"], ["ANTLR", "#9DC3FF"], ["Apex", "null"], ["API Blueprint", "#2ACCA8"], ["APL", "#5A8164"], ["Apollo Guidance Computer", "null"], ["AppleScript", "#101F1F"], ["Arc", "#aa2afe"], ["ASP", "#6a40fd"], ["AspectJ", "#a957b0"], ["Assembly", "#6E4C13"], ["ATS", "#1ac620"], ["Augeas", "null"], ["AutoHotkey", "#6594b9"], ["AutoIt", "#1C3552"], ["Awk", "null"], ["Ballerina", "#FF5000"], ["Batchfile", "#C1F12E"], ["Befunge", "null"], ["Bison", "null"], ["BitBake", "null"], ["BlitzBasic", "null"], ["BlitzMax", "#cd6400"], ["Bluespec", "null"], ["Boo", "#d4bec1"], ["Brainfuck", "#2F2530"], ["Brightscript", "null"], ["Bro", "null"], ["C", "#555555"], ["C#", "#178600"], ["C++", "#f34b7d"], ["C2hs Haskell", "null"], ["Cap'n Proto", "null"], ["CartoCSS", "null"], ["Ceylon", "#dfa535"], ["Chapel", "#8dc63f"], ["Charity", "null"], ["ChucK", "null"], ["Cirru", "#ccccff"], ["Clarion", "#db901e"], ["Clean", "#3F85AF"], ["Click", "#E4E6F3"], ["CLIPS", "null"], ["Clojure", "#db5855"], ["CMake", "null"], ["COBOL", "null"], ["CoffeeScript", "#244776"], ["ColdFusion", "#ed2cd6"], ["ColdFusion CFC", "null"], ["Common Lisp", "#3fb68b"], ["Common Workflow Language", "#B5314C"], ["Component Pascal", "#B0CE4E"], ["Cool", "null"], ["Coq", "null"], ["Crystal", "#776791"], ["Csound", "null"], ["Csound Document", "null"], ["Csound Score", "null"], ["CSS", "#563d7c"], ["Cuda", "#3A4E3A"], ["CWeb", "null"], ["Cycript", "null"], ["Cython", "null"], ["D", "#ba595e"], ["Dart", "#00B4AB"], ["DataWeave", "#003a52"], ["DIGITAL Command Language", "null"], ["DM", "#447265"], ["Dockerfile", "#0db7ed"], ["Dogescript", "#cca760"], ["DTrace", "null"], ["Dylan", "#6c616e"], ["E", "#ccce35"], ["eC", "#913960"], ["ECL", "#8a1267"], ["ECLiPSe", "null"], ["Eiffel", "#946d57"], ["Elixir", "#6e4a7e"], ["Elm", "#60B5CC"], ["Emacs Lisp", "#c065db"], ["EmberScript", "#FFF4F3"], ["EQ", "#a78649"], ["Erlang", "#B83998"], ["F#", "#b845fc"], ["Factor", "#636746"], ["Fancy", "#7b9db4"], ["Fantom", "#14253c"], ["Filebench WML", "null"], ["Filterscript", "null"], ["fish", "null"], ["FLUX", "#88ccff"], ["Forth", "#341708"], ["Fortran", "#4d41b1"], ["FreeMarker", "#0050b2"], ["Frege", "#00cafe"], ["Game Maker Language", "#8fb200"], ["GAMS", "null"], ["GAP", "null"], ["GCC Machine Description", "null"], ["GDB", "null"], ["GDScript", "null"], ["Genie", "#fb855d"], ["Genshi", "null"], ["Gentoo Ebuild", "null"], ["Gentoo Eclass", "null"], ["Gherkin", "#5B2063"], ["GLSL", "null"], ["Glyph", "#e4cc98"], ["Gnuplot", "#f0a9f0"], ["Go", "#375eab"], ["Golo", "#88562A"], ["Gosu", "#82937f"], ["Grace", "null"], ["Grammatical Framework", "#79aa7a"], ["Groovy", "#e69f56"], ["Groovy Server Pages", "null"], ["Hack", "#878787"], ["Harbour", "#0e60e3"], ["Haskell", "#5e5086"], ["Haxe", "#df7900"], ["HCL", "null"], ["HiveQL", "#dce200"], ["HLSL", "null"], ["HTML", "#e34c26"], ["Hy", "#7790B2"], ["HyPhy", "null"], ["IDL", "#a3522f"], ["Idris", "#b30000"], ["IGOR Pro", "null"], ["Inform 7", "null"], ["Inno Setup", "null"], ["Io", "#a9188d"], ["Ioke", "#078193"], ["Isabelle", "#FEFE00"], ["Isabelle ROOT", "null"], ["J", "#9EEDFF"], ["Jasmin", "null"], ["Java", "#b07219"], ["Java Server Pages", "null"], ["JavaScript", "#f1e05a"], ["JFlex", "null"], ["Jison", "null"], ["Jison Lex", "null"], ["Jolie", "#843179"], ["JSONiq", "#40d47e"], ["JSX", "null"], ["Julia", "#a270ba"], ["Jupyter Notebook", "#DA5B0B"], ["Kotlin", "#F18E33"], ["KRL", "#28431f"], ["LabVIEW", "null"], ["Lasso", "#999999"], ["Lean", "null"], ["Lex", "#DBCA00"], ["LFE", "#4C3023"], ["LilyPond", "null"], ["Limbo", "null"], ["Literate Agda", "null"], ["Literate CoffeeScript", "null"], ["Literate Haskell", "null"], ["LiveScript", "#499886"], ["LLVM", "#185619"], ["Logos", "null"], ["Logtalk", "null"], ["LOLCODE", "#cc9900"], ["LookML", "#652B81"], ["LoomScript", "null"], ["LSL", "#3d9970"], ["Lua", "#000080"], ["M", "null"], ["M4", "null"], ["M4Sugar", "null"], ["Makefile", "#427819"], ["Mako", "null"], ["Mask", "#f97732"], ["Mathematica", "null"], ["Matlab", "#e16737"], ["Max", "#c4a79c"], ["MAXScript", "#00a6a6"], ["Mercury", "#ff2b2b"], ["Meson", "#007800"], ["Metal", "#8f14e9"], ["MiniD", "null"], ["Mirah", "#c7a938"], ["Modelica", "null"], ["Modula-2", "null"], ["Module Management System", "null"], ["Monkey", "null"], ["Moocode", "null"], ["MoonScript", "null"], ["MQL4", "#62A8D6"], ["MQL5", "#4A76B8"], ["MTML", "#b7e1f4"], ["MUF", "null"], ["mupad", "null"], ["Myghty", "null"], ["NCL", "#28431f"], ["Nearley", "#990000"], ["Nemerle", "#3d3c6e"], ["nesC", "#94B0C7"], ["NetLinx", "#0aa0ff"], ["NetLinx+ERB", "#747faa"], ["NetLogo", "#ff6375"], ["NewLisp", "#87AED7"], ["Nextflow", "#3ac486"], ["Nim", "#37775b"], ["Nit", "#009917"], ["Nix", "#7e7eff"], ["NSIS", "null"], ["Nu", "#c9df40"], ["NumPy", "null"], ["Objective-C", "#438eff"], ["Objective-C++", "#6866fb"], ["Objective-J", "#ff0c5a"], ["OCaml", "#3be133"], ["Omgrofl", "#cabbff"], ["ooc", "#b0b77e"], ["Opa", "null"], ["Opal", "#f7ede0"], ["OpenCL", "null"], ["OpenEdge ABL", "null"], ["OpenRC runscript", "null"], ["OpenSCAD", "null"], ["Ox", "null"], ["Oxygene", "#cdd0e3"], ["Oz", "#fab738"], ["P4", "#7055b5"], ["Pan", "#cc0000"], ["Papyrus", "#6600cc"], ["Parrot", "#f3ca0a"], ["Parrot Assembly", "null"], ["Parrot Internal Representation", "null"], ["Pascal", "#E3F171"], ["PAWN", "#dbb284"], ["Pep8", "#C76F5B"], ["Perl", "#0298c3"], ["Perl 6", "#0000fb"], ["PHP", "#4F5D95"], ["PicoLisp", "null"], ["PigLatin", "#fcd7de"], ["Pike", "#005390"], ["PLpgSQL", "null"], ["PLSQL", "#dad8d8"], ["PogoScript", "#d80074"], ["Pony", "null"], ["PostScript", "#da291c"], ["POV-Ray SDL", "null"], ["PowerBuilder", "#8f0f8d"], ["PowerShell", "#012456"], ["Processing", "#0096D8"], ["Prolog", "#74283c"], ["Propeller Spin", "#7fa2a7"], ["Puppet", "#302B6D"], ["PureBasic", "#5a6986"], ["PureScript", "#1D222D"], ["Python", "#3572A5"], ["Python console", "null"], ["q", "#0040cd"], ["QMake", "null"], ["QML", "#44a51c"], ["R", "#198CE7"], ["Racket", "#22228f"], ["Ragel", "#9d5200"], ["RAML", "#77d9fb"], ["Rascal", "#fffaa0"], ["REALbasic", "null"], ["Reason", "null"], ["Rebol", "#358a5b"], ["Red", "#f50000"], ["Redcode", "null"], ["Ren'Py", "#ff7f7f"], ["RenderScript", "null"], ["REXX", "null"], ["Ring", "#0e60e3"], ["RobotFramework", "null"], ["Roff", "#ecdebe"], ["Rouge", "#cc0088"], ["RPC", "null"], ["Ruby", "#701516"], ["RUNOFF", "#665a4e"], ["Rust", "#dea584"], ["Sage", "null"], ["SaltStack", "#646464"], ["SAS", "#B34936"], ["Scala", "#c22d40"], ["Scheme", "#1e4aec"], ["Scilab", "null"], ["sed", "#64b970"], ["Self", "#0579aa"], ["ShaderLab", "null"], ["Shell", "#89e051"], ["ShellSession", "null"], ["Shen", "#120F14"], ["Slash", "#007eff"], ["Smali", "null"], ["Smalltalk", "#596706"], ["Smarty", "null"], ["SMT", "null"], ["Solidity", "#AA6746"], ["SourcePawn", "#5c7611"], ["SQF", "#3F3F3F"], ["SQLPL", "null"], ["Squirrel", "#800000"], ["SRecode Template", "#348a34"], ["Stan", "#b2011d"], ["Standard ML", "#dc566d"], ["Stata", "null"], ["SuperCollider", "#46390b"], ["Swift", "#ffac45"], ["SystemVerilog", "#DAE1C2"], ["Tcl", "#e4cc98"], ["Tcsh", "null"], ["Terra", "#00004c"], ["TeX", "#3D6117"], ["Thrift", "null"], ["TI Program", "#A0AA87"], ["TLA", "null"], ["Turing", "#cf142b"], ["TXL", "null"], ["TypeScript", "#2b7489"], ["Unified Parallel C", "null"], ["Unix Assembly", "null"], ["Uno", "null"], ["UnrealScript", "#a54c4d"], ["UrWeb", "null"], ["Vala", "#fbe5cd"], ["VCL", "#0298c3"], ["Verilog", "#b2b7f8"], ["VHDL", "#adb2cb"], ["Vim script", "#199f4b"], ["Visual Basic", "#945db7"], ["Volt", "#1F1F1F"], ["Vue", "#2c3e50"], ["wdl", "#42f1f4"], ["WebAssembly", "#04133b"], ["WebIDL", "null"], ["wisp", "#7582D1"], ["X10", "#4B6BEF"], ["xBase", "#403a40"], ["XC", "#99DA07"], ["Xojo", "null"], ["XProc", "null"], ["XQuery", "#5232e7"], ["XS", "null"], ["XSLT", "#EB8CEB"], ["Xtend", "null"], ["Yacc", "#4B6C4B"], ["Zephir", "#118f9e"], ["Zimpl", "null"]]);
        var starredRepos = JSON.parse(response.responseText);
        starredRepos.forEach(function (starredRepo) {
          starredReposBlock += '<div class="py-2 my-2 border-bottom"><a class="f6 text-bold link-gray-dark d-flex no-underline wb-break-all"href="' + starredRepo.html_url + '">' + starredRepo.full_name + '</a><p class="f6 text-gray mb-2"itemprop="description">' + starredRepo.description + '</p>' + (starredRepo.language == null ? '' : '<span class="mr-2 f6 text-gray text-normal"><span class="repo-language-color"style="background-color:' + languageColor.get(starredRepo.language) + ';"></span><span itemprop="programmingLanguage"> ' + starredRepo.language + '</span></span>') + '<span class="f6 text-gray text-normal"><svg aria-label="star"class="octicon octicon-star"viewBox="0 0 14 16"version="1.1"width="14"height="16"role="img"><path fill-rule="evenodd"d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg> ' + (starredRepo.stargazers_count > 1000 ? (starredRepo.stargazers_count / 1000).toFixed(1) + 'k' : starredRepo.stargazers_count) + '</span></div>';
        });
        GM_setValue('starredReposBlock', starredReposBlock);
        GM_setValue('lastStoreStarredReposTime', Date.now());
      },
      onerror: function () { console.log('[GithubDashboardEnhance]: There was a problem with the request.'); },
      ontimeout: function () { console.log('[GithubDashboardEnhance]: Request timeout.'); },
    });
  }
  if (rightColumn != null) rightColumn.insertAdjacentHTML('beforeEnd', GM_getValue('starredReposBlock', ''));
}