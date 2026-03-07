'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, FileText, Globe, BookMarked } from 'lucide-react';
import { AnimatedSection, SectionHeader } from '@/components/ui/AnimatedSection';
import { Card, StatCard } from '@/components/ui/Card';
import SearchBar from '@/components/ui/SearchBar';

interface Publication {
  _id: string;
  title: string;
  authors: string;
  year: string;
  type: 'book' | 'bookChapter' | 'internationalJournal' | 'nationalJournal' | 'internationalConference' | 'nationalConference';
  journal?: string;
  conference?: string;
  volume?: string;
  pages?: string;
  doi?: string;
  indexing?: string;
  award?: string;
  location?: string;
  date?: string;
  publisher?: string;
  chapter?: string;
}

type FilterType = 'all' | 'books' | 'journals' | 'conferences' | 'bookChapters';

export default function PublicationsPage() {
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [searchFiltered, setSearchFiltered] = useState<Publication[]>([]);
  const [filter, setFilter] = useState<FilterType>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/publications')
      .then((r) => r.json())
      .then((data) => {
        setAllPublications(data);
        setSearchFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const displayList = useMemo(() => {
    if (filter === 'all') return searchFiltered;
    if (filter === 'books') return searchFiltered.filter((p) => p.type === 'book');
    if (filter === 'bookChapters') return searchFiltered.filter((p) => p.type === 'bookChapter');
    if (filter === 'journals') return searchFiltered.filter((p) => p.type === 'internationalJournal' || p.type === 'nationalJournal');
    return searchFiltered.filter((p) => p.type === 'internationalConference' || p.type === 'nationalConference');
  }, [searchFiltered, filter]);

  const books = displayList.filter((p) => p.type === 'book');
  const bookChapters = displayList.filter((p) => p.type === 'bookChapter');
  const intlJournals = displayList.filter((p) => p.type === 'internationalJournal');
  const natlJournals = displayList.filter((p) => p.type === 'nationalJournal');
  const intlConf = displayList.filter((p) => p.type === 'internationalConference');
  const natlConf = displayList.filter((p) => p.type === 'nationalConference');

  const pubStats = useMemo(() => ({
    books: allPublications.filter((p) => p.type === 'book').length,
    bookChapters: allPublications.filter((p) => p.type === 'bookChapter').length,
    intlJournals: allPublications.filter((p) => p.type === 'internationalJournal').length,
    natlJournals: allPublications.filter((p) => p.type === 'nationalJournal').length,
    intlConf: allPublications.filter((p) => p.type === 'internationalConference').length,
    natlConf: allPublications.filter((p) => p.type === 'nationalConference').length,
  }), [allPublications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
      </div>
    );
  }

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
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 max-w-5xl mx-auto mb-12">
          <StatCard number={pubStats.books.toString()} label="Books" />
          <StatCard number={pubStats.bookChapters.toString()} label="Book Chapters" />
          <StatCard number={pubStats.intlJournals.toString()} label="Intl. Journals" />
          <StatCard number={pubStats.natlJournals.toString()} label="Natl. Journals" />
          <StatCard number={pubStats.intlConf.toString()} label="Intl. Conf." />
          <StatCard number={pubStats.natlConf.toString()} label="Natl. Conf." />
        </div>

        {/* Search Bar */}
        <SearchBar
          data={allPublications}
          onSearch={setSearchFiltered}
          searchFields={['title', 'authors', 'journal', 'conference', 'publisher']}
          placeholder="Search publications by title, author, journal, or conference..."
        />

        {/* Filters */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="glass-card p-2">
            <div className="flex flex-wrap gap-2 justify-center">
              {[
                { key: 'all', label: 'All Publications', icon: FileText },
                { key: 'books', label: 'Books', icon: BookOpen },
                { key: 'bookChapters', label: 'Book Chapters', icon: BookMarked },
                { key: 'journals', label: 'Journals', icon: FileText },
                { key: 'conferences', label: 'Conferences', icon: Globe },
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key as FilterType)}
                  className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm ${
                    filter === key
                      ? 'bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                      : 'bg-white text-gray-700 hover:bg-indigo-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <AnimatedSection>
          <div className="max-w-6xl mx-auto space-y-12">
            {/* Books */}
            {(filter === 'all' || filter === 'books') && books.length > 0 && (
              <div>
                <SectionHeader title="Books" />
                <div className="space-y-4">
                  {books.map((book, index) => (
                    <Card key={book._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{book.title}</h3>
                          <p className="text-sm text-gray-700 mb-1">{book.authors}</p>
                          <p className="text-sm text-gray-600">{book.publisher} {book.chapter && `- ${book.chapter}`}</p>
                          <span className="inline-block mt-2 text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{book.year}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Book Chapters */}
            {(filter === 'all' || filter === 'bookChapters') && bookChapters.length > 0 && (
              <div>
                <SectionHeader title={`Book Chapters (${pubStats.bookChapters})`} />
                <div className="space-y-4">
                  {bookChapters.map((chapter, index) => (
                    <Card key={chapter._id} delay={index * 0.1}>
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center flex-shrink-0">
                          <BookMarked className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{chapter.title}</h3>
                          <p className="text-sm text-gray-700 mb-1">{chapter.authors}</p>
                          <p className="text-sm text-gray-600">{chapter.publisher}</p>
                          {chapter.chapter && <p className="text-xs text-gray-500 mt-1">{chapter.chapter}</p>}
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs font-medium text-violet-600 bg-violet-50 px-3 py-1 rounded-full">{chapter.year}</span>
                            {chapter.doi && <a href={`https://doi.org/${chapter.doi}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors">DOI</a>}
                          </div>
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
                {intlJournals.length > 0 && (
                  <div>
                    <SectionHeader title={`International Journals (${pubStats.intlJournals})`} />
                    <div className="space-y-4">
                      {intlJournals.map((paper, index) => (
                        <Card key={paper._id} delay={index * 0.05}>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <FileText className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                              <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                              <p className="text-sm text-gray-600 mb-1">{paper.journal}</p>
                              <div className="flex flex-wrap gap-2 items-center">
                                {paper.volume && <span className="text-xs text-gray-600">{paper.volume}</span>}
                                {paper.pages && <span className="text-xs text-gray-600">{paper.pages}</span>}
                                <span className="text-xs font-medium text-primary-600 bg-primary-50 px-3 py-1 rounded-full">{paper.year}</span>
                                {paper.indexing && <span className="text-xs font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">{paper.indexing}</span>}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {natlJournals.length > 0 && (
                  <div>
                    <SectionHeader title={`National Journals (${pubStats.natlJournals})`} />
                    <div className="space-y-4">
                      {natlJournals.map((paper, index) => (
                        <Card key={paper._id} delay={index * 0.1}>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center flex-shrink-0">
                              <FileText className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                              <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                              <p className="text-sm text-gray-600 mb-1">{paper.journal}</p>
                              <div className="flex flex-wrap gap-2">
                                {paper.volume && <span className="text-xs text-gray-600">{paper.volume}</span>}
                                {paper.pages && <span className="text-xs text-gray-600">{paper.pages}</span>}
                                <span className="text-xs font-medium text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{paper.year}</span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Conferences */}
            {(filter === 'all' || filter === 'conferences') && (
              <>
                {intlConf.length > 0 && (
                  <div>
                    <SectionHeader title={`International Conferences (${pubStats.intlConf})`} />
                    <div className="space-y-4">
                      {intlConf.map((paper, index) => (
                        <Card key={paper._id} delay={index * 0.05}>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                              <Globe className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                              <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                              <p className="text-sm text-gray-600 mb-1">{paper.conference}</p>
                              {(paper.location || paper.date) && <p className="text-xs text-gray-500 mb-2">{paper.location} {paper.date && `- ${paper.date}`}</p>}
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">{paper.year}</span>
                                {paper.award && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{paper.award}</span>}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {natlConf.length > 0 && (
                  <div>
                    <SectionHeader title={`National Conferences (${pubStats.natlConf})`} />
                    <div className="space-y-4">
                      {natlConf.map((paper, index) => (
                        <Card key={paper._id} delay={index * 0.1}>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                              <Globe className="text-white" size={20} />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-1">{paper.title}</h3>
                              <p className="text-sm text-gray-700 mb-1">{paper.authors}</p>
                              <p className="text-sm text-gray-600 mb-1">{paper.conference}</p>
                              {(paper.location || paper.date) && <p className="text-xs text-gray-500 mb-2">{paper.location} {paper.date && `- ${paper.date}`}</p>}
                              <div className="flex flex-wrap gap-2">
                                <span className="text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">{paper.year}</span>
                                {paper.award && <span className="text-xs font-medium text-amber-600 bg-amber-50 px-3 py-1 rounded-full">{paper.award}</span>}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
