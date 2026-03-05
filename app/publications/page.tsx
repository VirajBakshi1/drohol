'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Globe } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card, StatCard } from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';
import {
  books,
  internationalJournals,
  nationalJournals,
  internationalConferences,
  nationalConferences,
  publicationStats,
} from '@/data/publicationsData';

type FilterType = 'all' | 'books' | 'journals' | 'conferences';

export default function PublicationsPage() {
  const [filter, setFilter] = useState<FilterType>('all');

  // State for filtered data
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [filteredIntlJournals, setFilteredIntlJournals] = useState(internationalJournals);
  const [filteredNatlJournals, setFilteredNatlJournals] = useState(nationalJournals);
  const [filteredIntlConf, setFilteredIntlConf] = useState(internationalConferences);
  const [filteredNatlConf, setFilteredNatlConf] = useState(nationalConferences);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold gradient-text mb-4"
          >
            Publications
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-600"
          >
            Extensive research contributions in Robotics, Automation, and Mechanical Engineering
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto mb-12">
          <StatCard number={publicationStats.totalBooks.toString()} label="Books" />
          <StatCard number={publicationStats.totalInternationalJournals.toString()} label="Intl. Journals" />
          <StatCard number={publicationStats.totalNationalJournals.toString()} label="Natl. Journals" />
          <StatCard number={publicationStats.totalInternationalConferences.toString()} label="Intl. Conf." />
          <StatCard number={publicationStats.totalNationalConferences.toString()} label="Natl. Conf." />
        </div>

        {/* Search Bar */}
        <SearchBar
          data={[...books, ...internationalJournals, ...nationalJournals, ...internationalConferences, ...nationalConferences]}
          onSearch={(filtered) => {
            setFilteredBooks(filtered.filter(p => books.includes(p)));
            setFilteredIntlJournals(filtered.filter(p => internationalJournals.includes(p)));
            setFilteredNatlJournals(filtered.filter(p => nationalJournals.includes(p)));
            setFilteredIntlConf(filtered.filter(p => internationalConferences.includes(p)));
            setFilteredNatlConf(filtered.filter(p => nationalConferences.includes(p)));
          }}
          searchFields={['title', 'authors', 'journal', 'conference', 'publisher']}
          placeholder="Search publications by title, author, journal, or conference..."
        />

        {/* Filters */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="glass-card p-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { key: 'all', label: 'All Publications', icon: FileText },
                { key: 'books', label: 'Books', icon: BookOpen },
                { key: 'journals', label: 'Journals', icon: FileText },
                { key: 'conferences', label: 'Conferences', icon: Globe },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as FilterType)}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    filter === key
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatedSection>
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Books */}
            {(filter === 'all' || filter === 'books') && (
              <div>
                <SectionHeader title="Books" />
                <div className="space-y-4">
                  {filteredBooks.map((book, index) => (
                    <Card key={index} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                          <p className="text-sm text-gray-700 mb-1">{book.authors}</p>
                          <p className="text-sm text-gray-600">
                            {book.publisher} {book.chapter && `- ${book.chapter}`}
                          </p>
                          <span className="inline-block mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                            {book.year}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Journals */}
            {(filter === 'all' || filter === 'journals') && (
              <>
                {/* International Journals */}
                <div>
                  <SectionHeader title="International Journals (26)" />
                  <div className="space-y-4">
                    {filteredIntlJournals.map((paper, index) => (
                      <Card key={index} delay={index * 0.05}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                            <FileText className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                            <p className="text-sm text-gray-600 mb-1">{paper.journal}</p>
                            <div className="flex flex-wrap gap-2 items-center">
                              {paper.volume && (
                                <span className="text-xs text-gray-600">{paper.volume}</span>
                              )}
                              {paper.pages && (
                                <span className="text-xs text-gray-600">{paper.pages}</span>
                              )}
                              <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                                {paper.year}
                              </span>
                              {paper.indexing && (
                                <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                  {paper.indexing}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* National Journals */}
                <div>
                  <SectionHeader title="National Journals (3)" />
                  <div className="space-y-4">
                    {filteredNatlJournals.map((paper, index) => (
                      <Card key={index} delay={index * 0.1}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0">
                            <FileText className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                            <p className="text-sm text-gray-600 mb-1">{paper.journal}</p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs text-gray-600">{paper.volume}</span>
                              <span className="text-xs text-gray-600">{paper.pages}</span>
                              <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">
                                {paper.year}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Conferences */}
            {(filter === 'all' || filter === 'conferences') && (
              <>
                {/* International Conferences */}
                <div>
                  <SectionHeader title="International Conferences (54)" />
                  <p className="text-sm text-gray-600 mb-6">Showing representative sample</p>
                  <div className="space-y-4">
                    {filteredIntlConf.map((paper, index) => (
                      <Card key={index} delay={index * 0.05}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                            <Globe className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                            <p className="text-sm text-gray-600 mb-1">{paper.conference}</p>
                            <p className="text-xs text-gray-500 mb-2">
                              {paper.location} - {paper.date}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                                {paper.year}
                              </span>
                              {paper.award && (
                                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                  {paper.award}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* National Conferences */}
                <div>
                  <SectionHeader title="National Conferences (5)" />
                  <div className="space-y-4">
                    {filteredNatlConf.map((paper, index) => (
                      <Card key={index} delay={index * 0.1}>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                            <Globe className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                            <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                            <p className="text-sm text-gray-600 mb-1">{paper.conference}</p>
                            <p className="text-xs text-gray-500 mb-2">
                              {paper.location} - {paper.date}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                                {paper.year}
                              </span>
                              {paper.award && (
                                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                  {paper.award}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
