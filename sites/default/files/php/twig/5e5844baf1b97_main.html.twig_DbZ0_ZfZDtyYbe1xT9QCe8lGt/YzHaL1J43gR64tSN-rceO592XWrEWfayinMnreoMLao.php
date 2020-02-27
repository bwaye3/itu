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

/* themes/gavias_kiamo/templates/page/main.html.twig */
class __TwigTemplate_e76517dcaf314973e31c39ff0629d534aa2542e53e044c09a2171021e9243ba7 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 4, "if" => 5];
        $filters = ["escape" => 16];
        $functions = [];

        try {
            $this->sandbox->checkSecurity(
                ['set', 'if'],
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
        // line 1
        echo "<div class=\"content-main-inner\">
\t<div class=\"row\">
\t\t
\t\t";
        // line 4
        $context["cl_main"] = "col-md-12 col-xs-12";
        // line 5
        echo "\t\t";
        if (($this->getAttribute(($context["page"] ?? null), "sidebar_right", []) && $this->getAttribute(($context["page"] ?? null), "sidebar_left", []))) {
            echo "\t
\t\t\t";
            // line 6
            $context["cl_main"] = "col-xs-12 col-md-6 col-md-push-3 sb-r sb-l ";
            // line 7
            echo "\t\t";
        } elseif (($this->getAttribute(($context["page"] ?? null), "sidebar_right", []) || $this->getAttribute(($context["page"] ?? null), "sidebar_left", []))) {
            echo "\t
\t\t\t";
            // line 8
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
                // line 9
                echo "\t\t\t \t";
                $context["cl_main"] = "col-xs-12 col-md-8 sb-r ";
                // line 10
                echo "\t\t\t";
            }
            echo " \t\t
\t\t\t";
            // line 11
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
                // line 12
                echo "\t\t\t\t";
                $context["cl_main"] = "col-xs-12 col-md-8 col-md-push-4 sb-l ";
                // line 13
                echo "\t\t\t";
            }
            echo "\t\t\t\t
      ";
        }
        // line 14
        echo " 

\t\t<div id=\"page-main-content\" class=\"main-content ";
        // line 16
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_main"] ?? null)), "html", null, true);
        echo "\">

\t\t\t<div class=\"main-content-inner\">
\t\t\t\t
\t\t\t\t";
        // line 20
        if ($this->getAttribute(($context["page"] ?? null), "content_top", [])) {
            // line 21
            echo "\t\t\t\t\t<div class=\"content-top\">
\t\t\t\t\t\t";
            // line 22
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content_top", [])), "html", null, true);
            echo "
\t\t\t\t\t</div>
\t\t\t\t";
        }
        // line 25
        echo "
\t\t\t\t";
        // line 26
        if ($this->getAttribute(($context["page"] ?? null), "content", [])) {
            // line 27
            echo "\t\t\t\t\t<div class=\"content-main\">
\t\t\t\t\t\t";
            // line 28
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content", [])), "html", null, true);
            echo "
\t\t\t\t\t</div>
\t\t\t\t";
        }
        // line 31
        echo "
\t\t\t\t";
        // line 32
        if ($this->getAttribute(($context["page"] ?? null), "content_bottom", [])) {
            // line 33
            echo "\t\t\t\t\t<div class=\"content-bottom\">
\t\t\t\t\t\t";
            // line 34
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "content_bottom", [])), "html", null, true);
            echo "
\t\t\t\t\t</div>
\t\t\t\t";
        }
        // line 37
        echo "\t\t\t</div>

\t\t</div>

\t\t<!-- Sidebar Left -->
\t\t";
        // line 42
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
            // line 43
            echo "\t\t\t";
            $context["cl_left"] = "col-md-4 col-md-pull-8 col-sm-12 col-xs-12";
            // line 44
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
                // line 45
                echo "\t\t\t \t";
                $context["cl_left"] = "col-md-3 col-md-pull-6 col-sm-12 col-xs-12";
                // line 46
                echo "\t\t\t";
            }
            echo " \t\t
\t\t\t
\t\t\t<div class=\"";
            // line 48
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_left"] ?? null)), "html", null, true);
            echo " sidebar sidebar-left\">
\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t";
            // line 50
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 54
        echo "\t\t<!-- End Sidebar Left -->

\t\t<!-- Sidebar Right -->
\t\t";
        // line 57
        if ($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])) {
            // line 58
            echo "\t\t\t";
            $context["cl_right"] = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
            // line 59
            echo "\t\t\t";
            if ($this->getAttribute(($context["page"] ?? null), "sidebar_left", [])) {
                // line 60
                echo "\t\t\t\t";
                $context["cl_right"] = "col-lg-3 col-md-3 col-sm-12 col-xs-12";
                // line 61
                echo "\t\t\t";
            }
            echo "\t 

\t\t\t<div class=\"";
            // line 63
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["cl_right"] ?? null)), "html", null, true);
            echo " sidebar sidebar-right theiaStickySidebar\">
\t\t\t\t<div class=\"sidebar-inner\">
\t\t\t\t\t";
            // line 65
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "sidebar_right", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 69
        echo "\t\t<!-- End Sidebar Right -->
\t\t
\t</div>
</div>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_kiamo/templates/page/main.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  215 => 69,  208 => 65,  203 => 63,  197 => 61,  194 => 60,  191 => 59,  188 => 58,  186 => 57,  181 => 54,  174 => 50,  169 => 48,  163 => 46,  160 => 45,  157 => 44,  154 => 43,  152 => 42,  145 => 37,  139 => 34,  136 => 33,  134 => 32,  131 => 31,  125 => 28,  122 => 27,  120 => 26,  117 => 25,  111 => 22,  108 => 21,  106 => 20,  99 => 16,  95 => 14,  89 => 13,  86 => 12,  84 => 11,  79 => 10,  76 => 9,  74 => 8,  69 => 7,  67 => 6,  62 => 5,  60 => 4,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_kiamo/templates/page/main.html.twig", "/Users/bradleywaye/Sites/local.itu.edu/themes/gavias_kiamo/templates/page/main.html.twig");
    }
}
