//
//  IssueListViewController.swift
//  IssueTracker
//
//  Created by Effie on 2023/05/12.
//

import UIKit

class IssueListViewController: UIViewController {
   typealias IssueCell = IssueListCollectionViewCell
   typealias LoadCell = LoadCollectionViewCell
   
   let filterListID = "FilterList"
   
   var networkManager: NetworkManager?
   private var list: IssueList = IssueList()
   var fetchedAllData = IssueListDTO()
   
   var currentPageNumber: Int = 0
   var isPaging = false
   var hasNextPage = true
   
   var observers: [NSObjectProtocol] = []
   
   @IBOutlet weak var collectionView: UICollectionView!
   private var dataSource: DataSource!
   
   override func viewDidLoad() {
      super.viewDidLoad()
      self.title = "이슈"
      addObservers()
      setCollectionView()
      setNetworkManager()
      fetchIssues()
   }
   
   func setCollectionView() {
      collectionView.collectionViewLayout = createLayout()
      collectionView.delegate = self
      configureDataSource()
   }
   
   func createLayout() -> UICollectionViewLayout {
      let sectionProvider: UICollectionViewCompositionalLayoutSectionProvider = { _, layoutEnvironment in
         var config = UICollectionLayoutListConfiguration(appearance: .plain)
         config.showsSeparators = true
         config.trailingSwipeActionsConfigurationProvider = { [weak self] indexPath in
            let closeAction = SwiptAction.close.makeAction(withHandler: { action, view, handler in
               
            })
            
            let deleteAction = SwiptAction.delete.makeAction(withHandler: { action, view, handler in
               
            })
            
            let config = UISwipeActionsConfiguration(actions: [deleteAction, closeAction])
            config.performsFirstActionWithFullSwipe = false
            return config
         }
         return NSCollectionLayoutSection.list(using: config, layoutEnvironment: layoutEnvironment)
      }
      return UICollectionViewCompositionalLayout(sectionProvider: sectionProvider)
   }
   
   func fetchIssues(cellCompletion: (() -> Void)? = nil) {
      guard hasNextPage else { return }
      isPaging = true
      networkManager?.fetchIssueList() { [weak self] dto in
         cellCompletion?()
         self?.isPaging = false
         self?.hasNextPage = dto.issues.count < NetworkManager.defaultPagingOffSet ? false : true
         if dto.issues.count > 0 {
            self?.list.emptyList()
            let newIssues = ListingItemFactory.IssueTab.makeIssues(with: dto.issues)
            self?.list.add(issues: newIssues) // -> POST NOTIFICATION
            self?.fetchedAllData = dto
            self?.currentPageNumber += 1
         }
      }
   }
   
   private func createIssueCellRegisteration() -> UICollectionView.CellRegistration<IssueListCollectionViewCell, ItemType> {
      let issueCellNib = UINib(nibName: IssueCell.cellId, bundle: nil)
      return .init(cellNib: issueCellNib) { cell, indexPath, itemIdentifier in
         guard case Item.issue(let issue) = itemIdentifier else { return }
         cell.configure(issue: issue)
      }
   }
   
   private func createLoadCellRegisteration() -> UICollectionView.CellRegistration<LoadCollectionViewCell, ItemType> {
      let loadCellNib = UINib(nibName: LoadCell.cellId, bundle: nil)
      return .init(cellNib: loadCellNib, handler: { _, _, _ in })
   }
   
   private func createCellRegisteration<Cell: CellIdentifiable, Item>(cellCompletion: @escaping UICollectionView.CellRegistration<Cell, Item>.Handler) -> UICollectionView.CellRegistration<Cell, Item>  {
      let cellNib = UINib(nibName: Cell.cellId, bundle: nil)
      return .init(cellNib: cellNib, handler: cellCompletion)
   }
   
   private func configureDataSource() {
      let issueCellRegistration = createIssueCellRegisteration()
      let loadCellRegistration = createLoadCellRegisteration()
      
      dataSource = DataSource(collectionView: collectionView) { (collectionView, indexPath, item) -> UICollectionViewCell? in
         switch item {
         case .issue(let issue):
            return collectionView.dequeueConfiguredReusableCell(
               using: issueCellRegistration,
               for: indexPath,
               item: item)
         case .load:
            return collectionView.dequeueConfiguredReusableCell(
               using: loadCellRegistration,
               for: indexPath,
               item: item)
         default:
            return nil
         }
      }
   }
   
   private func applyUpdatedSnapshot(animated: Bool = true) {
      var snapshot = NSDiffableDataSourceSnapshot<SectionType, ItemType>()
      snapshot.appendSections([.issue, .loadIndicator])
//      let issues =
      snapshot.appendItems(list.issues.map { issue in Item.issue(issue: issue) }, toSection: .issue)
      snapshot.appendItems([.load], toSection: .loadIndicator)
      dataSource.apply(snapshot, animatingDifferences: animated)
   }
   
   func setNetworkManager() {
      networkManager = NetworkManager(session: URLSession.shared)
   }
   
   @IBAction func filter(_ sender: Any) {
      let storyboard = UIStoryboard(name: filterListID, bundle: nil)
      guard let filterListViewController = storyboard.instantiateInitialViewController() as? FilterListViewController else { return }
      filterListViewController.delegate = self
      self.present(filterListViewController, animated: true)
   }
}

extension IssueListViewController: UICollectionViewDelegate {
   func collectionView(
      _ collectionView: UICollectionView,
      willDisplay cell: UICollectionViewCell,
      forItemAt indexPath: IndexPath)
   {
      if indexPath == IndexPath(item: 0, section: 1) {
         guard let loadCell = cell as? LoadCollectionViewCell else { return }
         loadCell.start()
         fetchIssues(cellCompletion: { DispatchQueue.main.async { [weak loadCell] in loadCell?.stop() } })
      }
   }
}
   
extension IssueListViewController: DataSenderDelegate {
   func receive() -> IssueListDTO {
      fetchedAllData
   }
}

extension IssueListViewController {
   typealias SectionType = Section
   typealias ItemType = Item
   
   enum Section {
      case issue
      case loadIndicator
      
      var cellClass: UICollectionViewCell.Type {
         switch self {
         case .issue: return IssueCell.self
         case .loadIndicator: return LoadCell.self
         }
      }
   }
   
   enum Item: Hashable {
      case issue(issue: IssueList.Issue)
      case load
   }
   
   private class DataSource: UICollectionViewDiffableDataSource<SectionType, ItemType> { }
}

extension IssueListViewController {
   private func addObservers() {
      var noti = NotificationCenter.default.addObserver(
         forName: IssueList.Notifications.didAddIssues,
         object: list, queue: .main,
         using: { [weak self] _ in self?.applyUpdatedSnapshot() })
      self.observers.append(noti)
   }
}

extension IssueListViewController {
   func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
      let storyboard = UIStoryboard(name: "IssueDetail", bundle: nil)
      guard let viewController = storyboard.instantiateInitialViewController() as?
                                       IssueDetailViewController else { return }
      
      viewController.issueId = list.issues[indexPath.row].issueId
      self.navigationController?.pushViewController(viewController, animated: true)
   }
}
