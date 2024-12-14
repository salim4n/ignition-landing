import React from "react";
import { ArrowRight, Book, Lightbulb, GraduationCap } from "lucide-react";

interface ResourcesSectionProps {
  t: {
    resources: {
      title: string;
      subtitle: string;
      blog: {
        title: string;
        description: string;
        categories: string[];
        cta: string;
      };
      learning: {
        title: string;
        sections: {
          title: string;
          topics: string[];
        }[];
      };
    };
  };
}

const ResourcesSection: React.FC<ResourcesSectionProps> = ({ t }) => {
  return (
    <section id="resources" className="py-24 bg-[#0a192f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">{t.resources.title}</h2>
          <p className="text-xl text-gray-300">{t.resources.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Documentation Section */}
          <div className="bg-[#112240] rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <Book className="w-8 h-8 text-blue-400 mr-4" />
              <h3 className="text-2xl font-bold text-white">{t.resources.blog.title}</h3>
            </div>
            <p className="text-gray-300 mb-8">{t.resources.blog.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {t.resources.blog.categories.map((category, index) => (
                <div
                  key={index}
                  className="bg-[#1a365d] p-4 rounded-lg text-gray-200 hover:bg-[#2d4a77] transition-colors"
                >
                  {category}
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              {t.resources.blog.cta} <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </div>

          {/* Learning Path Section */}
          <div className="bg-[#112240] rounded-xl p-8 shadow-lg">
            <div className="flex items-center mb-6">
              <GraduationCap className="w-8 h-8 text-blue-400 mr-4" />
              <h3 className="text-2xl font-bold text-white">
                {t.resources.learning.title}
              </h3>
            </div>
            <div className="space-y-8">
              {t.resources.learning.sections.map((section, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center mb-4">
                    <Lightbulb className="w-6 h-6 text-blue-400 mr-3" />
                    <h4 className="text-xl font-semibold text-white">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="ml-9 space-y-3 text-gray-300">
                    {section.topics.map((topic, topicIndex) => (
                      <li
                        key={topicIndex}
                        className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-4 before:h-[1px] before:bg-blue-400"
                      >
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
