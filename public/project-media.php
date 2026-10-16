<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$projectsRoot = realpath(__DIR__ . '/images/projects');
$requestedFolder = isset($_GET['folder']) ? trim((string) $_GET['folder']) : '';

if ($projectsRoot === false || $requestedFolder === '') {
    echo json_encode(['items' => []]);
    exit;
}

$targetFolderPath = realpath($projectsRoot . DIRECTORY_SEPARATOR . $requestedFolder);

if ($targetFolderPath === false || strpos($targetFolderPath, $projectsRoot) !== 0 || !is_dir($targetFolderPath)) {
    echo json_encode(['items' => []]);
    exit;
}

$allowedExtensions = [
    'jpg' => 'image',
    'jpeg' => 'image',
    'png' => 'image',
    'webp' => 'image',
    'mp4' => 'video'
];

$items = [];

$iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($targetFolderPath, FilesystemIterator::SKIP_DOTS)
);

foreach ($iterator as $fileInfo) {
    if (!$fileInfo->isFile()) {
        continue;
    }

    $extension = strtolower(pathinfo($fileInfo->getFilename(), PATHINFO_EXTENSION));

    if (!array_key_exists($extension, $allowedExtensions)) {
        continue;
    }

    $absolutePath = $fileInfo->getPathname();
    $relativePath = str_replace('\\\\', '/', substr($absolutePath, strlen($projectsRoot) + 1));
    $encodedPath = implode('/', array_map('rawurlencode', explode('/', $relativePath)));

    $items[] = [
        'path' => $relativePath,
        'src' => '/images/projects/' . $encodedPath,
        'type' => $allowedExtensions[$extension]
    ];
}

usort($items, function ($left, $right) {
    return strcmp($left['path'], $right['path']);
});

echo json_encode(['items' => $items]);
