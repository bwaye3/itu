<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* themes/gavias_kiamo/templates/page/html.html.twig */
class __TwigTemplate_a9a3d147da9cc6ebcf3fb2ccba3260ed6e58207271f3d19753fa813711983582 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["if" => 45, "set" => 91, "include" => 111];
        $filters = ["escape" => 27, "raw" => 29, "safe_join" => 36, "clean_class" => 93, "t" => 102];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['if', 'set', 'include'],
                ['escape', 'raw', 'safe_join', 'clean_class', 't'],
                []
            );
        } catch (SecurityError $e) {
            $e->setSourceContext($this->getSourceContext());

            if ($e instanceof SecurityNotAllowedTagError && isset($tags[$e->getTagName()])) {
                $e->setTemplateLine($tags[$e->getTagName()]);
            } elseif ($e instanceof SecurityNotAllowedFilterError && isset($filters[$e->getFilterName()])) {
                $e->setTemplateLine($filters[$e->getFilterName()]);
            } elseif ($e instanceof SecurityNotAllowedFunctionError && isset($functions[$e->getFunctionName()])) {
                $e->setTemplateLine($functions[$e->getFunctionName()]);
            }

            throw $e;
        }

    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        // line 26
        echo "<!DOCTYPE html>
<html";
        // line 27
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["html_attributes"] ?? null)), "html", null, true);
        echo ">
  <head> 
    <head-placeholder token=\"";
        // line 29
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null)));
        echo "\">
      <link rel=\"apple-touch-icon\" sizes=\"180x180\" href=\"/apple-touch-icon.png\">
      <link rel=\"icon\" type=\"image/png\" sizes=\"32x32\" href=\"/favicon-32x32.png\">
      <link rel=\"icon\" type=\"image/png\" sizes=\"16x16\" href=\"/favicon-16x16.png\">
      <link rel=\"manifest\" href=\"/site.webmanifest\">
      <meta name=\"msapplication-TileColor\" content=\"#da532c\">
      <meta name=\"theme-color\" content=\"#ffffff\">
    <title>";
        // line 36
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->env->getExtension('Drupal\Core\Template\TwigExtension')->safeJoin($this->env, $this->sandbox->ensureToStringAllowed(($context["head_title"] ?? null)), " | "));
        echo "</title>
    <css-placeholder token=\"";
        // line 37
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null)));
        echo "\">
      <js-placeholder token=\"";
        // line 38
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null)));
        echo "\">

    <link rel=\"stylesheet\" href=\"";
        // line 40
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["theme_path"] ?? null)), "html", null, true);
        echo "/css/custom.css\" media=\"screen\" />
    <link rel=\"stylesheet\" href=\"";
        // line 41
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["theme_path"] ?? null)), "html", null, true);
        echo "/css/update.css\" media=\"screen\" />

    ";
        // line 43
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["links_google_fonts"] ?? null)));
        echo "

    ";
        // line 45
        if (($context["customize_css"] ?? null)) {
            // line 46
            echo "      <style type=\"text/css\">
        ";
            // line 47
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["customize_css"] ?? null)));
            echo "
      </style>
    ";
        }
        // line 50
        echo "
    ";
        // line 51
        if (($context["customize_styles"] ?? null)) {
            // line 52
            echo "      ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["customize_styles"] ?? null)));
            echo "
    ";
        }
        // line 54
        echo "
      <script type=\"text/javascript\">
        window.NREUM||(NREUM={}),__nr_require=function(t,n,e){function r(e){if(!n[e]){var o=n[e]={exports:{}};t[e][0].call(o.exports,function(n){var o=t[e][1][n];return r(o||n)},o,o.exports)}return n[e].exports}if(\"function\"==typeof __nr_require)return __nr_require;for(var o=0;o<e.length;o++)r(e[o]);return r}({1:[function(t,n,e){function r(t){try{s.console&&console.log(t)}catch(n){}}var o,i=t(\"ee\"),a=t(16),s={};try{o=localStorage.getItem(\"__nr_flags\").split(\",\"),console&&\"function\"==typeof console.log&&(s.console=!0,o.indexOf(\"dev\")!==-1&&(s.dev=!0),o.indexOf(\"nr_dev\")!==-1&&(s.nrDev=!0))}catch(c){}s.nrDev&&i.on(\"internal-error\",function(t){r(t.stack)}),s.dev&&i.on(\"fn-err\",function(t,n,e){r(e.stack)}),s.dev&&(r(\"NR AGENT IN DEVELOPMENT MODE\"),r(\"flags: \"+a(s,function(t,n){return t}).join(\", \")))},{}],2:[function(t,n,e){function r(t,n,e,r,s){try{p?p-=1:o(s||new UncaughtException(t,n,e),!0)}catch(f){try{i(\"ierr\",[f,c.now(),!0])}catch(d){}}return\"function\"==typeof u&&u.apply(this,a(arguments))}function UncaughtException(t,n,e){this.message=t||\"Uncaught error with no additional information\",this.sourceURL=n,this.line=e}function o(t,n){var e=n?null:c.now();i(\"err\",[t,e])}var i=t(\"handle\"),a=t(17),s=t(\"ee\"),c=t(\"loader\"),f=t(\"gos\"),u=window.onerror,d=!1,l=\"nr@seenError\",p=0;c.features.err=!0,t(1),window.onerror=r;try{throw new Error}catch(h){\"stack\"in h&&(t(8),t(7),\"addEventListener\"in window&&t(5),c.xhrWrappable&&t(9),d=!0)}s.on(\"fn-start\",function(t,n,e){d&&(p+=1)}),s.on(\"fn-err\",function(t,n,e){d&&!e[l]&&(f(e,l,function(){return!0}),this.thrown=!0,o(e))}),s.on(\"fn-end\",function(){d&&!this.thrown&&p>0&&(p-=1)}),s.on(\"internal-error\",function(t){i(\"ierr\",[t,c.now(),!0])})},{}],3:[function(t,n,e){t(\"loader\").features.ins=!0},{}],4:[function(t,n,e){function r(t){}if(window.performance&&window.performance.timing&&window.performance.getEntriesByType){var o=t(\"ee\"),i=t(\"handle\"),a=t(8),s=t(7),c=\"learResourceTimings\",f=\"addEventListener\",u=\"resourcetimingbufferfull\",d=\"bstResource\",l=\"resource\",p=\"-start\",h=\"-end\",m=\"fn\"+p,v=\"fn\"+h,w=\"bstTimer\",y=\"pushState\",g=t(\"loader\");g.features.stn=!0,t(6);var b=NREUM.o.EV;o.on(m,function(t,n){var e=t[0];e instanceof b&&(this.bstStart=g.now())}),o.on(v,function(t,n){var e=t[0];e instanceof b&&i(\"bst\",[e,n,this.bstStart,g.now()])}),a.on(m,function(t,n,e){this.bstStart=g.now(),this.bstType=e}),a.on(v,function(t,n){i(w,[n,this.bstStart,g.now(),this.bstType])}),s.on(m,function(){this.bstStart=g.now()}),s.on(v,function(t,n){i(w,[n,this.bstStart,g.now(),\"requestAnimationFrame\"])}),o.on(y+p,function(t){this.time=g.now(),this.startPath=location.pathname+location.hash}),o.on(y+h,function(t){i(\"bstHist\",[location.pathname+location.hash,this.startPath,this.time])}),f in window.performance&&(window.performance[\"c\"+c]?window.performance[f](u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance[\"c\"+c]()},!1):window.performance[f](\"webkit\"+u,function(t){i(d,[window.performance.getEntriesByType(l)]),window.performance[\"webkitC\"+c]()},!1)),document[f](\"scroll\",r,{passive:!0}),document[f](\"keypress\",r,!1),document[f](\"click\",r,!1)}},{}],5:[function(t,n,e){function r(t){for(var n=t;n&&!n.hasOwnProperty(u);)n=Object.getPrototypeOf(n);n&&o(n)}function o(t){s.inPlace(t,[u,d],\"-\",i)}function i(t,n){return t[1]}var a=t(\"ee\").get(\"events\"),s=t(19)(a,!0),c=t(\"gos\"),f=XMLHttpRequest,u=\"addEventListener\",d=\"removeEventListener\";n.exports=a,\"getPrototypeOf\"in Object?(r(document),r(window),r(f.prototype)):f.prototype.hasOwnProperty(u)&&(o(window),o(f.prototype)),a.on(u+\"-start\",function(t,n){var e=t[1],r=c(e,\"nr@wrapped\",function(){function t(){if(\"function\"==typeof e.handleEvent)return e.handleEvent.apply(e,arguments)}var n={object:t,\"function\":e}[typeof e];return n?s(n,\"fn-\",null,n.name||\"anonymous\"):e});this.wrapped=t[1]=r}),a.on(d+\"-start\",function(t){t[1]=this.wrapped||t[1]})},{}],6:[function(t,n,e){var r=t(\"ee\").get(\"history\"),o=t(19)(r);n.exports=r,o.inPlace(window.history,[\"pushState\",\"replaceState\"],\"-\")},{}],7:[function(t,n,e){var r=t(\"ee\").get(\"raf\"),o=t(19)(r),i=\"equestAnimationFrame\";n.exports=r,o.inPlace(window,[\"r\"+i,\"mozR\"+i,\"webkitR\"+i,\"msR\"+i],\"raf-\"),r.on(\"raf-start\",function(t){t[0]=o(t[0],\"fn-\")})},{}],8:[function(t,n,e){function r(t,n,e){t[0]=a(t[0],\"fn-\",null,e)}function o(t,n,e){this.method=e,this.timerDuration=isNaN(t[1])?0:+t[1],t[0]=a(t[0],\"fn-\",this,e)}var i=t(\"ee\").get(\"timer\"),a=t(19)(i),s=\"setTimeout\",c=\"setInterval\",f=\"clearTimeout\",u=\"-start\",d=\"-\";n.exports=i,a.inPlace(window,[s,\"setImmediate\"],s+d),a.inPlace(window,[c],c+d),a.inPlace(window,[f,\"clearImmediate\"],f+d),i.on(c+u,r),i.on(s+u,o)},{}],9:[function(t,n,e){function r(t,n){d.inPlace(n,[\"onreadystatechange\"],\"fn-\",s)}function o(){var t=this,n=u.context(t);t.readyState>3&&!n.resolved&&(n.resolved=!0,u.emit(\"xhr-resolved\",[],t)),d.inPlace(t,y,\"fn-\",s)}function i(t){g.push(t),h&&(x?x.then(a):v?v(a):(E=-E,O.data=E))}function a(){for(var t=0;t<g.length;t++)r([],g[t]);g.length&&(g=[])}function s(t,n){return n}function c(t,n){for(var e in t)n[e]=t[e];return n}t(5);var f=t(\"ee\"),u=f.get(\"xhr\"),d=t(19)(u),l=NREUM.o,p=l.XHR,h=l.MO,m=l.PR,v=l.SI,w=\"readystatechange\",y=[\"onload\",\"onerror\",\"onabort\",\"onloadstart\",\"onloadend\",\"onprogress\",\"ontimeout\"],g=[];n.exports=u;var b=window.XMLHttpRequest=function(t){var n=new p(t);try{u.emit(\"new-xhr\",[n],n),n.addEventListener(w,o,!1)}catch(e){try{u.emit(\"internal-error\",[e])}catch(r){}}return n};if(c(p,b),b.prototype=p.prototype,d.inPlace(b.prototype,[\"open\",\"send\"],\"-xhr-\",s),u.on(\"send-xhr-start\",function(t,n){r(t,n),i(n)}),u.on(\"open-xhr-start\",r),h){var x=m&&m.resolve();if(!v&&!m){var E=1,O=document.createTextNode(E);new h(a).observe(O,{characterData:!0})}}else f.on(\"fn-end\",function(t){t[0]&&t[0].type===w||a()})},{}],10:[function(t,n,e){function r(t){var n=this.params,e=this.metrics;if(!this.ended){this.ended=!0;for(var r=0;r<d;r++)t.removeEventListener(u[r],this.listener,!1);if(!n.aborted){if(e.duration=a.now()-this.startTime,4===t.readyState){n.status=t.status;var i=o(t,this.lastSize);if(i&&(e.rxSize=i),this.sameOrigin){var c=t.getResponseHeader(\"X-NewRelic-App-Data\");c&&(n.cat=c.split(\", \").pop())}}else n.status=0;e.cbTime=this.cbTime,f.emit(\"xhr-done\",[t],t),s(\"xhr\",[n,e,this.startTime])}}}function o(t,n){var e=t.responseType;if(\"json\"===e&&null!==n)return n;var r=\"arraybuffer\"===e||\"blob\"===e||\"json\"===e?t.response:t.responseText;return h(r)}function i(t,n){var e=c(n),r=t.params;r.host=e.hostname+\":\"+e.port,r.pathname=e.pathname,t.sameOrigin=e.sameOrigin}var a=t(\"loader\");if(a.xhrWrappable){var s=t(\"handle\"),c=t(11),f=t(\"ee\"),u=[\"load\",\"error\",\"abort\",\"timeout\"],d=u.length,l=t(\"id\"),p=t(14),h=t(13),m=window.XMLHttpRequest;a.features.xhr=!0,t(9),f.on(\"new-xhr\",function(t){var n=this;n.totalCbs=0,n.called=0,n.cbTime=0,n.end=r,n.ended=!1,n.xhrGuids={},n.lastSize=null,p&&(p>34||p<10)||window.opera||t.addEventListener(\"progress\",function(t){n.lastSize=t.loaded},!1)}),f.on(\"open-xhr-start\",function(t){this.params={method:t[0]},i(this,t[1]),this.metrics={}}),f.on(\"open-xhr-end\",function(t,n){\"loader_config\"in NREUM&&\"xpid\"in NREUM.loader_config&&this.sameOrigin&&n.setRequestHeader(\"X-NewRelic-ID\",NREUM.loader_config.xpid)}),f.on(\"send-xhr-start\",function(t,n){var e=this.metrics,r=t[0],o=this;if(e&&r){var i=h(r);i&&(e.txSize=i)}this.startTime=a.now(),this.listener=function(t){try{\"abort\"===t.type&&(o.params.aborted=!0),(\"load\"!==t.type||o.called===o.totalCbs&&(o.onloadCalled||\"function\"!=typeof n.onload))&&o.end(n)}catch(e){try{f.emit(\"internal-error\",[e])}catch(r){}}};for(var s=0;s<d;s++)n.addEventListener(u[s],this.listener,!1)}),f.on(\"xhr-cb-time\",function(t,n,e){this.cbTime+=t,n?this.onloadCalled=!0:this.called+=1,this.called!==this.totalCbs||!this.onloadCalled&&\"function\"==typeof e.onload||this.end(e)}),f.on(\"xhr-load-added\",function(t,n){var e=\"\"+l(t)+!!n;this.xhrGuids&&!this.xhrGuids[e]&&(this.xhrGuids[e]=!0,this.totalCbs+=1)}),f.on(\"xhr-load-removed\",function(t,n){var e=\"\"+l(t)+!!n;this.xhrGuids&&this.xhrGuids[e]&&(delete this.xhrGuids[e],this.totalCbs-=1)}),f.on(\"addEventListener-end\",function(t,n){n instanceof m&&\"load\"===t[0]&&f.emit(\"xhr-load-added\",[t[1],t[2]],n)}),f.on(\"removeEventListener-end\",function(t,n){n instanceof m&&\"load\"===t[0]&&f.emit(\"xhr-load-removed\",[t[1],t[2]],n)}),f.on(\"fn-start\",function(t,n,e){n instanceof m&&(\"onload\"===e&&(this.onload=!0),(\"load\"===(t[0]&&t[0].type)||this.onload)&&(this.xhrCbStart=a.now()))}),f.on(\"fn-end\",function(t,n){this.xhrCbStart&&f.emit(\"xhr-cb-time\",[a.now()-this.xhrCbStart,this.onload,n],n)})}},{}],11:[function(t,n,e){n.exports=function(t){var n=document.createElement(\"a\"),e=window.location,r={};n.href=t,r.port=n.port;var o=n.href.split(\"://\");!r.port&&o[1]&&(r.port=o[1].split(\"/\")[0].split(\"@\").pop().split(\":\")[1]),r.port&&\"0\"!==r.port||(r.port=\"https\"===o[0]?\"443\":\"80\"),r.hostname=n.hostname||e.hostname,r.pathname=n.pathname,r.protocol=o[0],\"/\"!==r.pathname.charAt(0)&&(r.pathname=\"/\"+r.pathname);var i=!n.protocol||\":\"===n.protocol||n.protocol===e.protocol,a=n.hostname===document.domain&&n.port===e.port;return r.sameOrigin=i&&(!n.hostname||a),r}},{}],12:[function(t,n,e){function r(){}function o(t,n,e){return function(){return i(t,[f.now()].concat(s(arguments)),n?null:this,e),n?void 0:this}}var i=t(\"handle\"),a=t(16),s=t(17),c=t(\"ee\").get(\"tracer\"),f=t(\"loader\"),u=NREUM;\"undefined\"==typeof window.newrelic&&(newrelic=u);var d=[\"setPageViewName\",\"setCustomAttribute\",\"setErrorHandler\",\"finished\",\"addToTrace\",\"inlineHit\",\"addRelease\"],l=\"api-\",p=l+\"ixn-\";a(d,function(t,n){u[n]=o(l+n,!0,\"api\")}),u.addPageAction=o(l+\"addPageAction\",!0),u.setCurrentRouteName=o(l+\"routeName\",!0),n.exports=newrelic,u.interaction=function(){return(new r).get()};var h=r.prototype={createTracer:function(t,n){var e={},r=this,o=\"function\"==typeof n;return i(p+\"tracer\",[f.now(),t,e],r),function(){if(c.emit((o?\"\":\"no-\")+\"fn-start\",[f.now(),r,o],e),o)try{return n.apply(this,arguments)}catch(t){throw c.emit(\"fn-err\",[arguments,this,t],e),t}finally{c.emit(\"fn-end\",[f.now()],e)}}}};a(\"actionText,setName,setAttribute,save,ignore,onEnd,getContext,end,get\".split(\",\"),function(t,n){h[n]=o(p+n)}),newrelic.noticeError=function(t){\"string\"==typeof t&&(t=new Error(t)),i(\"err\",[t,f.now()])}},{}],13:[function(t,n,e){n.exports=function(t){if(\"string\"==typeof t&&t.length)return t.length;if(\"object\"==typeof t){if(\"undefined\"!=typeof ArrayBuffer&&t instanceof ArrayBuffer&&t.byteLength)return t.byteLength;if(\"undefined\"!=typeof Blob&&t instanceof Blob&&t.size)return t.size;if(!(\"undefined\"!=typeof FormData&&t instanceof FormData))try{return JSON.stringify(t).length}catch(n){return}}}},{}],14:[function(t,n,e){var r=0,o=navigator.userAgent.match(/Firefox[\\/\\s](\\d+\\.\\d+)/);o&&(r=+o[1]),n.exports=r},{}],15:[function(t,n,e){function r(t,n){if(!o)return!1;if(t!==o)return!1;if(!n)return!0;if(!i)return!1;for(var e=i.split(\".\"),r=n.split(\".\"),a=0;a<r.length;a++)if(r[a]!==e[a])return!1;return!0}var o=null,i=null,a=/Version\\/(\\S+)\\s+Safari/;if(navigator.userAgent){var s=navigator.userAgent,c=s.match(a);c&&s.indexOf(\"Chrome\")===-1&&s.indexOf(\"Chromium\")===-1&&(o=\"Safari\",i=c[1])}n.exports={agent:o,version:i,match:r}},{}],16:[function(t,n,e){function r(t,n){var e=[],r=\"\",i=0;for(r in t)o.call(t,r)&&(e[i]=n(r,t[r]),i+=1);return e}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],17:[function(t,n,e){function r(t,n,e){n||(n=0),\"undefined\"==typeof e&&(e=t?t.length:0);for(var r=-1,o=e-n||0,i=Array(o<0?0:o);++r<o;)i[r]=t[n+r];return i}n.exports=r},{}],18:[function(t,n,e){n.exports={exists:\"undefined\"!=typeof window.performance&&window.performance.timing&&\"undefined\"!=typeof window.performance.timing.navigationStart}},{}],19:[function(t,n,e){function r(t){return!(t&&t instanceof Function&&t.apply&&!t[a])}var o=t(\"ee\"),i=t(17),a=\"nr@original\",s=Object.prototype.hasOwnProperty,c=!1;n.exports=function(t,n){function e(t,n,e,o){function nrWrapper(){var r,a,s,c;try{a=this,r=i(arguments),s=\"function\"==typeof e?e(r,a):e||{}}catch(f){l([f,\"\",[r,a,o],s])}u(n+\"start\",[r,a,o],s);try{return c=t.apply(a,r)}catch(d){throw u(n+\"err\",[r,a,d],s),d}finally{u(n+\"end\",[r,a,c],s)}}return r(t)?t:(n||(n=\"\"),nrWrapper[a]=t,d(t,nrWrapper),nrWrapper)}function f(t,n,o,i){o||(o=\"\");var a,s,c,f=\"-\"===o.charAt(0);for(c=0;c<n.length;c++)s=n[c],a=t[s],r(a)||(t[s]=e(a,f?s+o:o,i,s))}function u(e,r,o){if(!c||n){var i=c;c=!0;try{t.emit(e,r,o,n)}catch(a){l([a,e,r,o])}c=i}}function d(t,n){if(Object.defineProperty&&Object.keys)try{var e=Object.keys(t);return e.forEach(function(e){Object.defineProperty(n,e,{get:function(){return t[e]},set:function(n){return t[e]=n,n}})}),n}catch(r){l([r])}for(var o in t)s.call(t,o)&&(n[o]=t[o]);return n}function l(n){try{t.emit(\"internal-error\",n)}catch(e){}}return t||(t=o),e.inPlace=f,e.flag=a,e}},{}],ee:[function(t,n,e){function r(){}function o(t){function n(t){return t&&t instanceof r?t:t?c(t,s,i):i()}function e(e,r,o,i){if(!l.aborted||i){t&&t(e,r,o);for(var a=n(o),s=m(e),c=s.length,f=0;f<c;f++)s[f].apply(a,r);var d=u[g[e]];return d&&d.push([b,e,r,a]),a}}function p(t,n){y[t]=m(t).concat(n)}function h(t,n){var e=y[t];if(e)for(var r=0;r<e.length;r++)e[r]===n&&e.splice(r,1)}function m(t){return y[t]||[]}function v(t){return d[t]=d[t]||o(e)}function w(t,n){f(t,function(t,e){n=n||\"feature\",g[e]=n,n in u||(u[n]=[])})}var y={},g={},b={on:p,addEventListener:p,removeEventListener:h,emit:e,get:v,listeners:m,context:n,buffer:w,abort:a,aborted:!1};return b}function i(){return new r}function a(){(u.api||u.feature)&&(l.aborted=!0,u=l.backlog={})}var s=\"nr@context\",c=t(\"gos\"),f=t(16),u={},d={},l=n.exports=o();l.backlog=u},{}],gos:[function(t,n,e){function r(t,n,e){if(o.call(t,n))return t[n];var r=e();if(Object.defineProperty&&Object.keys)try{return Object.defineProperty(t,n,{value:r,writable:!0,enumerable:!1}),r}catch(i){}return t[n]=r,r}var o=Object.prototype.hasOwnProperty;n.exports=r},{}],handle:[function(t,n,e){function r(t,n,e,r){o.buffer([t],r),o.emit(t,n,e)}var o=t(\"ee\").get(\"handle\");n.exports=r,r.ee=o},{}],id:[function(t,n,e){function r(t){var n=typeof t;return!t||\"object\"!==n&&\"function\"!==n?-1:t===window?0:a(t,i,function(){return o++})}var o=1,i=\"nr@id\",a=t(\"gos\");n.exports=r},{}],loader:[function(t,n,e){function r(){if(!E++){var t=x.info=NREUM.info,n=p.getElementsByTagName(\"script\")[0];if(setTimeout(u.abort,3e4),!(t&&t.licenseKey&&t.applicationID&&n))return u.abort();f(g,function(n,e){t[n]||(t[n]=e)}),c(\"mark\",[\"onload\",a()+x.offset],null,\"api\");var e=p.createElement(\"script\");e.src=\"https://\"+t.agent,n.parentNode.insertBefore(e,n)}}function o(){\"complete\"===p.readyState&&i()}function i(){c(\"mark\",[\"domContent\",a()+x.offset],null,\"api\")}function a(){return O.exists&&performance.now?Math.round(performance.now()):(s=Math.max((new Date).getTime(),s))-x.offset}var s=(new Date).getTime(),c=t(\"handle\"),f=t(16),u=t(\"ee\"),d=t(15),l=window,p=l.document,h=\"addEventListener\",m=\"attachEvent\",v=l.XMLHttpRequest,w=v&&v.prototype;NREUM.o={ST:setTimeout,SI:l.setImmediate,CT:clearTimeout,XHR:v,REQ:l.Request,EV:l.Event,PR:l.Promise,MO:l.MutationObserver};var y=\"\"+location,g={beacon:\"bam.nr-data.net\",errorBeacon:\"bam.nr-data.net\",agent:\"js-agent.newrelic.com/nr-1099.min.js\"},b=v&&w&&w[h]&&!/CriOS/.test(navigator.userAgent),x=n.exports={offset:s,now:a,origin:y,features:{},xhrWrappable:b,userAgent:d};t(12),p[h]?(p[h](\"DOMContentLoaded\",i,!1),l[h](\"load\",r,!1)):(p[m](\"onreadystatechange\",o),l[m](\"onload\",r)),c(\"mark\",[\"firstbyte\",s],null,\"api\");var E=0,O=t(18)},{}]},{},[\"loader\",2,10,4,3]);
        ;NREUM.info={beacon:\"bam.nr-data.net\",errorBeacon:\"bam.nr-data.net\",licenseKey:\"cec825beb4\",applicationID:\"124951137\",sa:1}
      </script>
        <!-- Google Tag Manager -->
        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({‘gtm.start’:
            new Date().getTime(),event:‘gtm.js’});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!=‘dataLayer’?‘&l=‘+l:‘’;j.async=true;j.src=
’https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,‘script’,‘dataLayer’,‘GTM-P3RNM4Z’);</script>
        <!-- End Google Tag Manager -->


        <!-- Facebook Pixel Code -->
        <script>
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=‘2.0’;
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,‘script’,
          ’https://connect.facebook.net/en_US/fbevents.js');
                  fbq(‘init’, ‘201303450631630’);
          fbq(‘track’, ‘PageView’);
        </script>
        <noscript><img height=“1” width=“1\" style=“display:none”
                       src=“https://www.facebook.com/tr?id=201303450631630&ev=PageView&noscript=1
                       https://www.facebook.com/tr?id=201303450631630&ev=PageView&noscript=1
          \"
          /></noscript>
        <!-- End Facebook Pixel Code -->


        </head>

  ";
        // line 91
        $context["body_classes"] = [0 => ((        // line 92
($context["logged_in"] ?? null)) ? ("logged-in") : ("")), 1 => (( !        // line 93
($context["root_path"] ?? null)) ? ("frontpage") : (("path-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["root_path"] ?? null)))))), 2 => ((        // line 94
($context["node_type"] ?? null)) ? (("node--type-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["node_type"] ?? null))))) : ("")), 3 => ((        // line 95
($context["node_id"] ?? null)) ? (("node-" . \Drupal\Component\Utility\Html::getClass($this->sandbox->ensureToStringAllowed(($context["node_id"] ?? null))))) : (""))];
        // line 98
        echo "
  <body";
        // line 99
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["attributes"] ?? null), "addClass", [0 => ($context["body_classes"] ?? null)], "method")), "html", null, true);
        echo ">

    <a href=\"#main-content\" class=\"visually-hidden focusable\">
      ";
        // line 102
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar(t("Skip to main content"));
        echo "
    </a>
    ";
        // line 104
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page_top"] ?? null)), "html", null, true);
        echo "
    ";
        // line 105
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page"] ?? null)), "html", null, true);
        echo "
    ";
        // line 106
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["page_bottom"] ?? null)), "html", null, true);
        echo "
    <js-bottom-placeholder token=\"";
        // line 107
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->renderVar($this->sandbox->ensureToStringAllowed(($context["placeholder_token"] ?? null)));
        echo "\">
    
    ";
        // line 109
        if (($context["addon_template"] ?? null)) {
            // line 110
            echo "      <div class=\"permission-save-";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["save_customize_permission"] ?? null)), "html", null, true);
            echo "\">
        ";
            // line 111
            $this->loadTemplate(($context["addon_template"] ?? null), "themes/gavias_kiamo/templates/page/html.html.twig", 111)->display($context);
            // line 112
            echo "      </div>  
    ";
        }
        // line 114
        echo "    
  </body>
</html>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_kiamo/templates/page/html.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  211 => 114,  207 => 112,  205 => 111,  200 => 110,  198 => 109,  193 => 107,  189 => 106,  185 => 105,  181 => 104,  176 => 102,  170 => 99,  167 => 98,  165 => 95,  164 => 94,  163 => 93,  162 => 92,  161 => 91,  122 => 54,  116 => 52,  114 => 51,  111 => 50,  105 => 47,  102 => 46,  100 => 45,  95 => 43,  90 => 41,  86 => 40,  81 => 38,  77 => 37,  73 => 36,  63 => 29,  58 => 27,  55 => 26,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_kiamo/templates/page/html.html.twig", "/Users/bradleywaye/Sites/local.itu.edu/themes/gavias_kiamo/templates/page/html.html.twig");
    }
}
