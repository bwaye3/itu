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

/* themes/gavias_kiamo/templates/page/page.html.twig */
class __TwigTemplate_c1a2f9bb16b3006596b63e32074cb55d56eda649d1898ae937cf9e4f9a4fdd15 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["include" => 8, "if" => 13];
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
        echo "
";
        // line 8
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/parts/message.html.twig"), "themes/gavias_kiamo/templates/page/page.html.twig", 8)->display($context);
        // line 9
        echo "<div class=\"body-page gva-body-page\">
\t";
        // line 10
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/parts/preloader.html.twig"), "themes/gavias_kiamo/templates/page/page.html.twig", 10)->display($context);
        // line 11
        echo "   ";
        $this->loadTemplate(($context["header_skin"] ?? null), "themes/gavias_kiamo/templates/page/page.html.twig", 11)->display($context);
        // line 12
        echo "\t
   ";
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
        echo "\t
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
\t\t\t\t\t<div class=\"content-inner\">
\t\t\t\t\t\t";
            // line 32
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "help", [])), "html", null, true);
            echo "
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 37
        echo "
\t\t";
        // line 38
        if ($this->getAttribute(($context["page"] ?? null), "fw_before_content", [])) {
            // line 39
            echo "\t\t\t<div class=\"fw-before-content area\">
\t\t\t\t";
            // line 40
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "fw_before_content", [])), "html", null, true);
            echo "
\t\t\t</div>
\t\t";
        }
        // line 43
        echo "\t\t
\t\t<div class=\"clearfix\"></div>
\t\t";
        // line 45
        if ($this->getAttribute(($context["page"] ?? null), "before_content", [])) {
            // line 46
            echo "\t\t\t<div class=\"before_content area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t<div class=\"row\">
\t\t\t\t\t\t<div class=\"col-xs-12\">
\t\t\t\t\t\t\t";
            // line 50
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "before_content", [])), "html", null, true);
            echo "
\t\t\t\t\t\t\t</div>
\t\t\t\t\t</div>
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 56
        echo "\t\t
\t\t<div class=\"clearfix\"></div>
\t\t
\t\t<div id=\"content\" class=\"content content-full\">
\t\t\t<div class=\"container\">
\t\t\t\t";
        // line 61
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/main.html.twig"), "themes/gavias_kiamo/templates/page/page.html.twig", 61)->display($context);
        // line 62
        echo "\t\t\t</div>
\t\t</div>

\t\t";
        // line 65
        if ($this->getAttribute(($context["page"] ?? null), "highlighted", [])) {
            // line 66
            echo "\t\t\t<div class=\"highlighted area\">
\t\t\t\t<div class=\"container\">
\t\t\t\t\t";
            // line 68
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "highlighted", [])), "html", null, true);
            echo "
\t\t\t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 72
        echo "
\t\t";
        // line 73
        if ($this->getAttribute(($context["page"] ?? null), "after_content", [])) {
            // line 74
            echo "\t\t\t<div class=\"area after_content\">
\t\t\t\t<div class=\"container-fw\">
\t          \t<div class=\"content-inner\">
\t\t\t\t\t\t ";
            // line 77
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "after_content", [])), "html", null, true);
            echo "
\t          \t</div>
        \t\t</div>
\t\t\t</div>
\t\t";
        }
        // line 82
        echo "\t\t
\t\t";
        // line 83
        if ($this->getAttribute(($context["page"] ?? null), "fw_after_content", [])) {
            // line 84
            echo "\t\t\t<div class=\"fw-before-content area\">
\t\t\t\t";
            // line 85
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "fw_after_content", [])), "html", null, true);
            echo "
\t\t\t</div>
\t\t";
        }
        // line 88
        echo "
\t</div>
</div>

";
        // line 92
        $this->loadTemplate((($context["directory"] ?? null) . "/templates/page/footer.html.twig"), "themes/gavias_kiamo/templates/page/page.html.twig", 92)->display($context);
    }

    public function getTemplateName()
    {
        return "themes/gavias_kiamo/templates/page/page.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  218 => 92,  212 => 88,  206 => 85,  203 => 84,  201 => 83,  198 => 82,  190 => 77,  185 => 74,  183 => 73,  180 => 72,  173 => 68,  169 => 66,  167 => 65,  162 => 62,  160 => 61,  153 => 56,  144 => 50,  138 => 46,  136 => 45,  132 => 43,  126 => 40,  123 => 39,  121 => 38,  118 => 37,  110 => 32,  105 => 29,  103 => 28,  99 => 26,  93 => 24,  90 => 23,  88 => 22,  82 => 18,  76 => 15,  73 => 14,  71 => 13,  68 => 12,  65 => 11,  63 => 10,  60 => 9,  58 => 8,  55 => 7,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_kiamo/templates/page/page.html.twig", "/Users/bradleywaye/Sites/local.itu.edu/themes/gavias_kiamo/templates/page/page.html.twig");
    }
}
