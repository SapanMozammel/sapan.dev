import { CERTIFICATIONS_DATA, EDUCATION_DATA } from '@/data/content/education';
import { IconCertificate } from '@tabler/icons-react';

const formatYear = (value: string): string => {
	const [yearStr] = value.split('-');
	return yearStr ?? value;
};

const EducationPanel = () => {
	return (
		<div className='font-dm flex flex-col gap-[1em] p-[1.25em]'>
			<div className='flex flex-col gap-[0.65em]'>
				{EDUCATION_DATA.map((item) => (
					<article key={item.id} className='border-info/30 flex flex-col gap-[0.5em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.85em] dark:bg-black/30'>
						<div className='flex items-baseline justify-between gap-[0.5em]'>
							<h3 className='text-[0.85em] leading-tight font-bold'>{item.degree}</h3>
							<div className='text-secondary-500 dark:text-secondary-500 shrink-0 text-[0.75em] tracking-wide whitespace-nowrap'>
								{formatYear(item.startDate)} — {formatYear(item.endDate)}
							</div>
						</div>
						<div className='text-primary dark:text-success text-[0.8em] font-semibold'>{item.institution}</div>
						<div className='text-secondary-500 dark:text-secondary-500 text-[0.75em] tracking-wide'>
							{item.location}
							{item.meta ? ` · ${item.meta}` : ''}
						</div>
					</article>
				))}
			</div>
			<section className='flex flex-col gap-[0.65em]'>
				<h3 className='text-secondary-500 dark:text-secondary-500 text-[0.75em] font-semibold tracking-widest uppercase'>Certifications</h3>
				<div className='flex flex-col gap-[0.65em]'>
					{CERTIFICATIONS_DATA.map((cert) => (
						<div key={cert.id} className='border-info/30 flex items-center gap-[0.6em] rounded-[0.5em] border-[0.025em] border-solid bg-white/30 p-[0.7em] dark:bg-black/30'>
							<IconCertificate aria-hidden='true' className='text-primary dark:text-success size-[1.1em] shrink-0' />
							<div className='flex grow flex-col gap-[0.1em]'>
								<div className='text-[0.85em] leading-tight font-semibold'>{cert.name}</div>
								<div className='text-secondary-500 dark:text-secondary-500 text-[0.75em] tracking-wide'>
									{cert.issuer} · {cert.year}
								</div>
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	);
};

export default EducationPanel;
