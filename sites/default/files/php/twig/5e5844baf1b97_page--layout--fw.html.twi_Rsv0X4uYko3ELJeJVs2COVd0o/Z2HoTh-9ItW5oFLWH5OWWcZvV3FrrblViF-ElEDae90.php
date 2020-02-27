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

/* themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig */
class __TwigTemplate_7c732d265e26570ea6adc76004f23eb082738ad89c00ea02280dccf10b663887 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["include" => 7, "if" => 13];
        $filters = ["escape" => 15];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['include', 'if'],
                ['escape'],
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
        // line 7
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/parts/message.html.twig"), "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", 7)->display($context);
        // line 8
        echo "
<div class=\"body-page gva-body-page\">
\t";
        // line 10
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/parts/preloader.html.twig"), "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", 10)->display($context);
        // line 11
        echo "   ";
        $this->loadTemplate(($context["header_skin"] ?? null), "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", 11)->display($context);
        // line 12
        echo "\t
\t";
        // line 13
        if ($this->getAttribute(($context["page"] ?? null), "breadcrumbs", [])) {
            // line 14
            echo "\t\t<div class=\"breadcrumbs\">
\t\t\t";
            // line 15
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "breadcrumbs", [])), "html", null, true);
            echo "
\t\t</div>
\t";
        }
        // line 18
        echo "
\t<div role=\"main\" class=\"main main-page\">
\t
\t\t<div class=\"clearfix\"></div>
\t\t";
        // line 22
        if ($this->getAttribute(($context["page"] ?? null), "slideshow_content", [])) {
            // line 23
            echo "\t\t\t<div class=\"slideshow_content area\">
\t\t\t\t";
            // line 24
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "slideshow_content", [])), "html", null, true);
            echo "
\t\t\t</div>
\t\t";
        }
        // line 26
        echo "\t

\t\t";
        // line 28
        if ($this->getAttribute(($context["page"] ?? null), "help", [])) {
            // line 29
            echo "\t\t\t<div class=\"help show\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"control-panel\"><i class=\"fa fa-cogs\"></i></div>
\t\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t\t";
            // line 33
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "help", [])), "html", null, true);
            echo "
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 38
        echo "
\t\t";
        // line 39
        if ($this->getAttribute(($context["page"] ?? null), "fw_before_content", [])) {
            // line 40
            echo "\t\t\t<div class=\"fw-before-content area\">
\t\t\t\t";
            // line 41
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "fw_before_content", [])), "html", null, true);
            echo "
\t\t\t</div>
\t\t";
        }
        // line 44
        echo "\t\t
\t\t<div class=\"clearfix\"></div>
\t\t";
        // line 46
        if ($this->getAttribute(($context["page"] ?? null), "before_content", [])) {
            // line 47
            echo "\t\t\t<div class=\"before_content area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t<div class=\"col-xs-12\">
\t\t\t\t\t\t\t";
            // line 51
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "before_content", [])), "html", null, true);
            echo "
\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 57
        echo "\t\t
\t\t<div class=\"clearfix\"></div>
\t\t
\t\t<div id=\"content\" class=\"content content-full\">
\t\t\t<div class=\"container-full\">
\t\t\t\t";
        // line 62
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/main-no-sidebar.html.twig"), "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", 62)->display($context);
        // line 63
        echo "\t\t\t</div>
\t\t</div>

\t\t";
        // line 66
        if ($this->getAttribute(($context["page"] ?? null), "highlighted", [])) {
            // line 67
            echo "\t\t\t<div class=\"highlighted area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t";
            // line 69
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "highlighted", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 73
        echo "
\t\t";
        // line 74
        if ($this->getAttribute(($context["page"] ?? null), "after_content", [])) {
            // line 75
            echo "\t\t\t<div class=\"area after_content\">
\t\t\t\t<div class=\"container-fw\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t ";
            // line 78
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "after_content", [])), "html", null, true);
            echo "
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 83
        echo "\t\t
\t\t";
        // line 84
        if ($this->getAttribute(($context["page"] ?? null), "fw_after_content", [])) {
            // line 85
            echo "\t\t\t<div class=\"fw-before-content area\">
\t\t\t\t";
            // line 86
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "fw_after_content", [])), "html", null, true);
            echo "
\t\t\t</div>
\t\t";
        }
        // line 89
        echo "
\t</div>

</div>

";
        // line 94
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/footer.html.twig"), "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", 94)->display($context);
    }

    public function getTemplateName()
    {
        return "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  218 => 94,  211 => 89,  205 => 86,  202 => 85,  200 => 84,  197 => 83,  189 => 78,  184 => 75,  182 => 74,  179 => 73,  172 => 69,  168 => 67,  166 => 66,  161 => 63,  159 => 62,  152 => 57,  143 => 51,  137 => 47,  135 => 46,  131 => 44,  125 => 41,  122 => 40,  120 => 39,  117 => 38,  109 => 33,  103 => 29,  101 => 28,  97 => 26,  91 => 24,  88 => 23,  86 => 22,  80 => 18,  74 => 15,  71 => 14,  69 => 13,  66 => 12,  63 => 11,  61 => 10,  57 => 8,  55 => 7,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig", "/Users/bradleywaye/Sites/local.itu.edu/themes/gavias_kiamo/templates/page/page-layout/page--layout--fw.html.twig");
    }
}
