import { useEffect, useMemo, useState } from 'react';
import styles from './research-reports.module.scss';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DropdownMenu } from '@radix-ui/themes';
import { reportsDataService, ResearchReport } from '@/services/reports-data';

export interface ResearchReportsProps {
  isExpanded: boolean;
}

export function ResearchReports({ isExpanded }: ResearchReportsProps) {

  const [isSummaryVisible, setIsSummaryVisible] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedReport, setSelectedReport] = useState<ResearchReport>({});
  const [reports, setReports] = useState<ResearchReport[]>([]);

  const visibleReports = useMemo<ResearchReport[]>(() => applyFilter(), [searchQuery, reports]);

  useEffect(() => {
    const results = reportsDataService.getReports();
    setReports(results);
  }, []);

  function applyFilter(): ResearchReport[] {
    if(!searchQuery) {
      return reports;
    }

    return reports.filter(report => report.name?.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  return (
    <div className={styles['research-reports']}>

      <div className={styles['report-list']}>

        <div className={styles['filter-panel']}>
          Search:
          <input type='text' value={searchQuery} onChange={event => setSearchQuery(event.target.value)}></input>
          {/* <i className='fa-solid fa-filter'></i> */}
        </div>

        <div className='news'>
          {
            visibleReports.map(report =>
              <div className={report.name === selectedReport.name ? 'news-item active' : 'news-item'}
                onClick={() => { setIsSummaryVisible(true); setSelectedReport(report) }}>
                <div className='news-content'>
                  <div className='news-title'>
                    <i className='fa-regular fa-file-lines'></i>
                    {report.name}
                  </div>
                </div>
              </div>
            )
          }
        </div>

      </div>

      {
        isSummaryVisible ?
          <>
            <div className={`${styles['email-content']} scrollable-div ${isExpanded ? styles['expanded'] : ''}`}>
              <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>{selectedReport.emailContent}</ReactMarkdown>
            </div>

            <div className={`${styles['ai-summary']} scrollable-div ${isExpanded ? styles['expanded'] : ''}`}>
              <div className={styles['key-words']}>
                Keywords: <span>VC Landscape, Systematic Quant Strategies, Geo Political and Headline Risk</span>
              </div>
              <ReactMarkdown className='markdown' remarkPlugins={[remarkGfm]}>{selectedReport.aiSummary}</ReactMarkdown>
            </div>
          </> : <></>
      }


    </div>
  );
}