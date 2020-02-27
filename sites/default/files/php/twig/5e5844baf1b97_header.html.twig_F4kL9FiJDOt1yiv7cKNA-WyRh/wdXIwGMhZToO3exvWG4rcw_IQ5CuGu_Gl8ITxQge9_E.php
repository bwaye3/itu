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

/* themes/gavias_kiamo/templates/page/header.html.twig */
class __TwigTemplate_ee0d70a82adca0eeb6d3df62565a80779f25a19b85aec779f291475db9952bd1 extends \Twig\Template
{
    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = [
        ];
        $this->sandbox = $this->env->getExtension('\Twig\Extension\SandboxExtension');
        $tags = ["set" => 5, "if" => 6];
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
        echo "<header id=\"header\" class=\"header-v1\">



  ";
        // line 5
        $context["class_sticky"] = "";
        // line 6
        echo "  ";
        if ((($context["sticky_menu"] ?? null) == 1)) {
            // line 7
            echo "    ";
            $context["class_sticky"] = "gv-sticky-menu";
            // line 8
            echo "  ";
        }
        // line 9
        echo "   <div id=\"image-overlay\" class=\"\">
      <div class=\"header-main\">
         <div class=\"container header-content-layout\">
            <div class=\"header-main-inner p-relative\">
               <div class=\"row\">
                 <div class=\"col-md-3 col-sm-6 col-xs-8 branding\">
                   ";
        // line 15
        if ($this->getAttribute(($context["page"] ?? null), "branding", [])) {
            // line 16
            echo "                     ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "branding", [])), "html", null, true);
            echo "
                   ";
        }
        // line 18
        echo "                 </div>

                   ";
        // line 20
        if ($this->getAttribute(($context["page"] ?? null), "topbar", [])) {
            // line 21
            echo "                   <div class=\"col-md-8 col-sm-6\">
                       <div class=\"topbar-content\">";
            // line 22
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "topbar", [])), "html", null, true);
            echo "</div>
                   </div>
                   ";
        }
        // line 25
        echo "
               </div>
            </div>
         </div>
      </div>

     <div class=\"container-fluid ";
        // line 31
        echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed(($context["class_sticky"] ?? null)), "html", null, true);
        echo "\">
         <div class=\"container\">
            <div class=\"col-lg-12 col-sm-12 p-static\">
               <div class=\"header-inner clearfix\">
                  <div class=\"main-menu\">
                    <div class=\"area-main-menu\">
                      <div class=\"area-inner\">
                          <div class=\"gva-offcanvas-mobile\">
                            <div class=\"close-offcanvas hidden\"><i class=\"fa fa-times\"></i></div>
                            ";
        // line 40
        if ($this->getAttribute(($context["page"] ?? null), "main_menu", [])) {
            // line 41
            echo "                              ";
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "main_menu", [])), "html", null, true);
            echo "
                            
                            ";
        }
        // line 43
        echo "  
                            ";
        // line 44
        if ($this->getAttribute(($context["page"] ?? null), "offcanvas", [])) {
            // line 45
            echo "                              <div class=\"after-offcanvas hidden\">
                                ";
            // line 46
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "offcanvas", [])), "html", null, true);
            echo "
                              </div>
                           ";
        }
        // line 49
        echo "                           
                          </div>
                          
                          <div id=\"menu-bar\" class=\"menu-bar hidden-lg hidden-md\">
                            <span class=\"one\"></span>
                            <span class=\"two\"></span>
                            <span class=\"three\"></span>
                          </div>
                        
                        ";
        // line 58
        if ($this->getAttribute(($context["page"] ?? null), "search", [])) {
            // line 59
            echo "                          <div class=\"gva-search-region search-region\">
                            <span class=\"icon\"><i class=\"fa fa-search\"></i></span>
                            <div class=\"search-content\">
                              ";
            // line 62
            echo $this->env->getExtension('Drupal\Core\Template\TwigExtension')->escapeFilter($this->env, $this->sandbox->ensureToStringAllowed($this->getAttribute(($context["page"] ?? null), "search", [])), "html", null, true);
            echo "
                            </div>
                          </div>
                        ";
        }
        // line 66
        echo "
                      </div>
                    </div>
                  </div>  
               </div> 
            </div>
         </div>
      </div>
   </div>
</header>
";
    }

    public function getTemplateName()
    {
        return "themes/gavias_kiamo/templates/page/header.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  171 => 66,  164 => 62,  159 => 59,  157 => 58,  146 => 49,  140 => 46,  137 => 45,  135 => 44,  132 => 43,  125 => 41,  123 => 40,  111 => 31,  103 => 25,  97 => 22,  94 => 21,  92 => 20,  88 => 18,  82 => 16,  80 => 15,  72 => 9,  69 => 8,  66 => 7,  63 => 6,  61 => 5,  55 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Source("", "themes/gavias_kiamo/templates/page/header.html.twig", "/Users/bradleywaye/Sites/local.itu.edu/themes/gavias_kiamo/templates/page/header.html.twig");
    }
}
